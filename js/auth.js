// ==================== AUTHENTICATION FUNCTIONS ====================
let currentUser = null;
let authInitialized = false;

// Enhanced auth initialization
async function initializeAuth() {
    try {
        console.log('Initializing auth...');
        
        // First, check if we're handling a OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Session error:', error);
        }
        
        if (data.session) {
            console.log('Found existing session');
            currentUser = data.session.user;
            await loadUserData();
            showChatInterface();
        } else {
            console.log('No existing session');
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
    
    // Wait a brief moment to ensure everything is processed
    setTimeout(async () => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            console.log('User signed in or token refreshed');
            currentUser = session.user;
            await loadUserData();
            showChatInterface();
        } else if (event === 'SIGNED_OUT') {
            console.log('User signed out');
            currentUser = null;
            if (window.latinConversationSystem) {
                window.latinConversationSystem.userName = null;
                window.latinConversationSystem.resetConversation();
            }
            showAuthInterface();
        } else if (event === 'INITIAL_SESSION') {
            console.log('Initial session processed');
            // This is the key - handle the initial session from magic link
            if (session) {
                currentUser = session.user;
                await loadUserData();
                showChatInterface();
            }
        }
    }, 100); // Small delay to ensure state is settled
});

// Update your signInWithEmail to handle redirect better
async function signInWithEmail(email) {
    try {
        console.log('Attempting to send magic link to:', email);
        
        const sendButton = document.getElementById('send-magic-link');
        const originalText = sendButton.textContent;
        sendButton.textContent = 'Sending...';
        sendButton.disabled = true;

        const { error } = await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: {
                emailRedirectTo: window.location.origin + window.location.pathname
            },
        });

        sendButton.textContent = originalText;
        sendButton.disabled = false;
        
        if (error) {
            console.error('Supabase error details:', error);
            alert('Error sending magic link: ' + error.message);
        } else {
            alert('Magic link sent! Check your email.');
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

async function signInWithGoogle() {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + window.location.pathname
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
    
    // Show upgrade prompt after 5 messages
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

console.log('Auth functions exposed to window');
