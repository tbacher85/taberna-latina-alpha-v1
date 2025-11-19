// Remove the DOMContentLoaded listener from auth.js and just keep this:
console.log('Auth.js loaded, waiting for app initialization...');

// The app.js will call initializeAuth when ready
window.initializeAuth = async function() {
    try {
        console.log('Initializing auth from app...');
        
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
        
    } catch (error) {
        console.error('Auth initialization error:', error);
        showAuthInterface();
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
