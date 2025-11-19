// ==================== AUTHENTICATION FUNCTIONS ====================
let currentUser = null;

async function checkAuthState() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        currentUser = user;
        await loadUserData();
        showChatInterface();
    } else {
        showAuthInterface();
    }
}

async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'https://tbacher85.github.io/taberna-latina-alpha/'
        }
    });
    
    if (error) {
        console.error('Error signing in with Google:', error);
        alert('Error signing in with Google. Please try again.');
    }
}

async function signInWithEmail(email) {
    const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: 'https://tbacher85.github.io/taberna-latina-alpha/'
        },
    });
    
    if (error) {
        alert('Error sending magic link: ' + error.message);
    } else {
        alert('Check your email for the magic link!');
    }
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
    } else {
        currentUser = null;
        latinConversationSystem.userName = null;
        latinConversationSystem.resetConversation();
        showAuthInterface();
    }
}

function showAuthInterface() {
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('user-profile').classList.add('hidden');
    document.getElementById('chat-interface').classList.add('hidden');
}

async function showChatInterface() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('user-profile').classList.remove('hidden');
    document.getElementById('chat-interface').classList.remove('hidden');
    document.getElementById('user-email').textContent = currentUser.email;
    
    // Show upgrade prompt after 5 messages
    if (todaysMessageCount >= 5) {
        document.getElementById('upgrade-prompt').classList.remove('hidden');
        document.getElementById('upgrade-email').value = currentUser.email;
    }
    
    updateMessageCounter();
}

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        currentUser = session.user;
        loadUserData().then(() => showChatInterface());
    } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        latinConversationSystem.userName = null;
        latinConversationSystem.resetConversation();
        showAuthInterface();
    }
});
