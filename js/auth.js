// ==================== AUTHENTICATION FUNCTIONS ====================
let currentUser = null;

async function checkAuthState() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error checking auth state:', error);
            showAuthInterface();
            return;
        }
        
        if (user) {
            currentUser = user;
            await loadUserData();
            showChatInterface();
        } else {
            showAuthInterface();
        }
    } catch (error) {
        console.error('Unexpected error in checkAuthState:', error);
        showAuthInterface();
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

async function signInWithEmail(email) {
    try {
        // Show loading state
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
        
        // Reset button state
        sendButton.textContent = originalText;
        sendButton.disabled = false;
        
        if (error) {
            console.error('Full error from Supabase:', error);
            
            // More specific error messages
            if (error.message.includes('Failed to fetch')) {
                alert('Network error: Cannot connect to authentication service. Please check your internet connection and try again.');
            } else if (error.message.includes('rate limit')) {
                alert('Too many attempts. Please wait a few minutes before trying again.');
            } else {
                alert('Error sending magic link: ' + error.message);
            }
        } else {
            alert('Check your email for the magic link! It should arrive within a minute.');
            // Hide the email form after successful submission
            document.getElementById('email-auth-form').style.display = 'none';
        }
    } catch (error) {
        console.error('Unexpected error in email sign-in:', error);
        alert('Unexpected error: ' + error.message);
        
        // Reset button state
        const sendButton = document.getElementById('send-magic-link');
        sendButton.textContent = 'Send Magic Link';
        sendButton.disabled = false;
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

// Enhanced auth state change listener with error handling
try {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state change:', event, session);
        
        if (event === 'SIGNED_IN' && session) {
            currentUser = session.user;
            if (typeof loadUserData === 'function') {
                loadUserData().then(() => {
                    showChatInterface();
                }).catch(error => {
                    console.error('Error loading user data after sign-in:', error);
                    showChatInterface(); // Still show chat even if loading fails
                });
            } else {
                showChatInterface();
            }
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            if (window.latinConversationSystem) {
                window.latinConversationSystem.userName = null;
                window.latinConversationSystem.resetConversation();
            }
            showAuthInterface();
        } else if (event === 'TOKEN_REFRESHED') {
            console.log('Token refreshed');
        } else if (event === 'USER_UPDATED') {
            console.log('User updated');
        }
    });
} catch (error) {
    console.error('Error setting up auth state listener:', error);
}

// Make functions globally available for HTML onclick events
window.signInWithGoogle = signInWithGoogle;
window.signInWithEmail = signInWithEmail;
window.signOut = signOut;
