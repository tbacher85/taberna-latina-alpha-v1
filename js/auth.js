// ==================== AUTHENTICATION FUNCTIONS ====================
let currentUser = null;
let authInitialized = false;

// Your GitHub Pages URL - CRITICAL FOR AUTH TO WORK
const GITHUB_SITE_URL = 'https://tbacher85.github.io';
const GITHUB_APP_URL = 'https://tbacher85.github.io/taberna-latina-alpha-v1/';

// Enhanced debug function
function debugMagicLink() {
    console.log('=== MAGIC LINK DEBUG INFO ===');
    console.log('Full URL:', window.location.href);
    console.log('Hash:', window.location.hash);
    console.log('Search:', window.location.search);
    console.log('Pathname:', window.location.pathname);
    console.log('Origin:', window.location.origin);
    console.log('GitHub URL:', GITHUB_APP_URL);
    console.log('============================');
}

// FIXED: Enhanced auth initialization
async function initializeAuth() {
    try {
        console.log('Initializing auth...');
        debugMagicLink();
        
        // Check for tokens in URL fragment
        if (window.location.hash && window.location.hash.length > 1) {
            console.log('Processing URL hash:', window.location.hash);
            
            const fragmentParams = {};
            window.location.hash.substring(1).split('&').forEach(pair => {
                const [key, value] = pair.split('=');
                fragmentParams[key] = decodeURIComponent(value);
            });
            
            const accessToken = fragmentParams['access_token'];
            const refreshToken = fragmentParams['refresh_token'];
            
            console.log('Found tokens:', { 
                accessToken: accessToken ? 'YES' : 'NO',
                refreshToken: refreshToken ? 'YES' : 'NO'
            });
            
            if (accessToken) {
                console.log('Setting session from URL tokens...');
                const { data, error } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken
                });
                
                if (error) {
                    console.error('Error setting session:', error);
                    showAuthInterface();
                } else if (data.session) {
                    console.log('Session set successfully!');
                    currentUser = data.session.user;
                    await loadUserData();
                    showChatInterface();
                    window.history.replaceState({}, document.title, window.location.pathname);
                    return;
                }
            }
        }
        
        // Check existing session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
            console.error('Session error:', sessionError);
        }
        
        if (sessionData.session) {
            console.log('Found existing session');
            currentUser = sessionData.session.user;
            await loadUserData();
            showChatInterface();
        } else {
            console.log('No session found');
            showAuthInterface();
        }
        
        authInitialized = true;
        
    } catch (error) {
        console.error('Auth initialization error:', error);
        showAuthInterface();
    }
}

// Enhanced auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state change:', event, 'Session:', session ? 'exists' : 'none');
    
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        console.log('User signed in or token refreshed');
        currentUser = session.user;
        await loadUserData();
        showChatInterface();
        
        if (window.location.hash.includes('access_token')) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        currentUser = null;
        if (window.latinConversationSystem) {
            window.latinConversationSystem.userName = null;
            window.latinConversationSystem.resetConversation();
        }
        showAuthInterface();
    }
});

// FIXED: Magic link with explicit GitHub URL
async function signInWithEmail(email) {
    try {
        console.log('Attempting to send magic link to:', email);
        
        const sendButton = document.getElementById('send-magic-link');
        const originalText = sendButton.textContent;
        sendButton.textContent = 'Sending...';
        sendButton.disabled = true;

        // CRITICAL: Use explicit GitHub URL instead of dynamic redirect
        console.log('Using GitHub URL for redirect:', GITHUB_APP_URL);

        const { data, error } = await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: {
                emailRedirectTo: GITHUB_APP_URL  // Explicit GitHub URL
            }
        });

        sendButton.textContent = originalText;
        sendButton.disabled = false;
        
        if (error) {
            console.error('Supabase error:', error);
            alert('Error: ' + error.message);
        } else {
            console.log('Magic link response:', data);
            alert('Magic link sent! Please check your email AND spam folder. The link should redirect to: ' + GITHUB_APP_URL);
            document.getElementById('email-auth-form').style.display = 'none';
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('Unexpected error: ' + error.message);
        
        const sendButton = document.getElementById('send-magic-link');
        sendButton.textContent = 'Send Magic Link';
        sendButton.disabled = false;
    }
}

// FIXED: Google sign-in with explicit GitHub URL
async function signInWithGoogle() {
    try {
        console.log('Starting Google OAuth with redirect:', GITHUB_APP_URL);
        
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: GITHUB_APP_URL  // Explicit GitHub URL
            }
        });
        
        if (error) {
            console.error('Error signing in with Google:', error);
            alert('Error signing in with Google: ' + error.message);
        }
    } catch (error) {
        console.error('Unexpected error in Google sign-in:', error);
        alert('Unexpected error during Google sign-in. Please try again.');
    }
}

async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            alert('Error signing out: ' + error.message);
        } else {
            currentUser = null;
            if (window.latinConversationSystem) {
                window.latinConversationSystem.userName = null;
                window.latinConversationSystem.resetConversation();
            }
            showAuthInterface();
        }
    } catch (error) {
        console.error('Unexpected error in signOut:', error);
    }
}

function showAuthInterface() {
    const authSection = document.getElementById('auth-section');
    const userProfile = document.getElementById('user-profile');
    const chatInterface = document.getElementById('chat-interface');
    
    if (authSection) authSection.classList.remove('hidden');
    if (userProfile) userProfile.classList.add('hidden');
    if (chatInterface) chatInterface.classList.add('hidden');
}

async function showChatInterface() {
    const authSection = document.getElementById('auth-section');
    const userProfile = document.getElementById('user-profile');
    const chatInterface = document.getElementById('chat-interface');
    const userEmail = document.getElementById('user-email');
    const upgradePrompt = document.getElementById('upgrade-prompt');
    const upgradeEmail = document.getElementById('upgrade-email');
    
    if (authSection) authSection.classList.add('hidden');
    if (userProfile) userProfile.classList.remove('hidden');
    if (chatInterface) chatInterface.classList.remove('hidden');
    
    if (userEmail && currentUser) {
        userEmail.textContent = currentUser.email;
    }
    
    if (upgradePrompt && typeof todaysMessageCount !== 'undefined' && todaysMessageCount >= 5) {
        upgradePrompt.classList.remove('hidden');
        if (upgradeEmail && currentUser) {
            upgradeEmail.value = currentUser.email;
        }
    }
    
    if (typeof updateMessageCounter === 'function') {
        updateMessageCounter();
    }
}

// Make all auth functions available globally
window.signInWithGoogle = signInWithGoogle;
window.signInWithEmail = signInWithEmail;
window.signOut = signOut;
window.showAuthInterface = showAuthInterface;
window.showChatInterface = showChatInterface;
window.initializeAuth = initializeAuth;
window.debugMagicLink = debugMagicLink;

console.log('Auth functions exposed to window');
