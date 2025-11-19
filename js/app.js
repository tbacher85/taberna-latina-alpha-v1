// ==================== MAIN APPLICATION LOGIC ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('App starting...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    setupEventListeners();
    if (typeof updateSuggestedResponses === 'function') {
        updateSuggestedResponses();
    }
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Google Auth Button
    const googleAuthBtn = document.getElementById('google-auth-btn');
    if (googleAuthBtn) {
        googleAuthBtn.addEventListener('click', function() {
            console.log('Google auth button clicked');
            if (typeof signInWithGoogle === 'function') {
                signInWithGoogle();
            } else {
                console.error('signInWithGoogle function not found');
            }
        });
        console.log('Google auth listener attached');
    } else {
        console.error('Google auth button not found');
    }
    
    // Email Auth Button
    const emailAuthBtn = document.getElementById('email-auth-btn');
    if (emailAuthBtn) {
        emailAuthBtn.addEventListener('click', function() {
            console.log('Email auth button clicked');
            const emailForm = document.getElementById('email-auth-form');
            if (emailForm) {
                emailForm.style.display = 'block';
            }
        });
        console.log('Email auth listener attached');
    } else {
        console.error('Email auth button not found');
    }
    
    // Send Magic Link Button
    const sendMagicLinkBtn = document.getElementById('send-magic-link');
    if (sendMagicLinkBtn) {
        sendMagicLinkBtn.addEventListener('click', function() {
            console.log('Send magic link button clicked');
            const emailInput = document.getElementById('email-input');
            if (emailInput && typeof signInWithEmail === 'function') {
                const email = emailInput.value.trim();
                if (email) {
                    signInWithEmail(email);
                } else {
                    alert('Please enter an email address');
                }
            }
        });
        console.log('Send magic link listener attached');
    } else {
        console.error('Send magic link button not found');
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            console.log('Logout button clicked');
            if (typeof signOut === 'function') {
                signOut();
            }
        });
    }
    
    // Chat Send Button
    const chatSendBtn = document.getElementById('chat-send');
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', function() {
            console.log('Chat send button clicked');
            if (typeof sendMessage === 'function') {
                sendMessage();
            }
        });
    }
    
    // Chat Input Enter Key
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Enter key pressed in chat');
                if (typeof sendMessage === 'function') {
                    sendMessage();
                }
            }
        });
    }
    
    // Suggested Responses
    const suggestedResponses = document.getElementById('suggested-responses');
    if (suggestedResponses) {
        suggestedResponses.addEventListener('click', function(e) {
            if (e.target.classList.contains('suggestion-btn')) {
                const latinText = e.target.getAttribute('data-latin');
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    if (latinText.includes('[Nomen]')) {
                        const name = prompt('Please enter your name:');
                        if (name) {
                            if (window.latinConversationSystem) {
                                window.latinConversationSystem.userName = name;
                            }
                            chatInput.value = latinText.replace('[Nomen]', name);
                        }
                    } else {
                        chatInput.value = latinText;
                    }
                }
            }
        });
    }
    
    // Upgrade Form
    const upgradeForm = document.getElementById('upgrade-form');
    if (upgradeForm) {
        upgradeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest! We will contact you about premium features soon.');
            this.submit();
        });
    }
    
    console.log('All event listeners set up');
}

// Make sure functions are available globally
window.initializeApp = initializeApp;
window.setupEventListeners = setupEventListeners;
