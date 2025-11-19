// ==================== MAIN APPLICATION LOGIC ====================

// Wait for ALL scripts to load before initializing
window.addEventListener('load', function() {
    console.log('Window fully loaded, starting app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    
    // Wait a moment to ensure all functions are available
    setTimeout(() => {
        console.log('All functions check:');
        console.log('- signInWithGoogle:', typeof window.signInWithGoogle);
        console.log('- showAuthInterface:', typeof window.showAuthInterface);
        console.log('- supabase:', typeof window.supabase);
        
        if (typeof window.signInWithGoogle === 'function' && 
            typeof window.showAuthInterface === 'function') {
            setupEventListeners();
            if (typeof window.updateSuggestedResponses === 'function') {
                window.updateSuggestedResponses();
            }
        } else {
            console.error('Required functions not available yet, retrying...');
            setTimeout(initializeApp, 500); // Retry after 500ms
        }
    }, 100);
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Google Auth Button
    const googleAuthBtn = document.getElementById('google-auth-btn');
    if (googleAuthBtn && window.signInWithGoogle) {
        googleAuthBtn.addEventListener('click', function() {
            console.log('Google auth button clicked');
            window.signInWithGoogle();
        });
        console.log('Google auth listener attached');
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
    }
    
    // Send Magic Link Button
    const sendMagicLinkBtn = document.getElementById('send-magic-link');
    if (sendMagicLinkBtn && window.signInWithEmail) {
        sendMagicLinkBtn.addEventListener('click', function() {
            console.log('Send magic link button clicked');
            const emailInput = document.getElementById('email-input');
            if (emailInput) {
                const email = emailInput.value.trim();
                if (email) {
                    window.signInWithEmail(email);
                } else {
                    alert('Please enter an email address');
                }
            }
        });
        console.log('Send magic link listener attached');
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn && window.signOut) {
        logoutBtn.addEventListener('click', function() {
            console.log('Logout button clicked');
            window.signOut();
        });
    }
    
    // Chat Send Button
    const chatSendBtn = document.getElementById('chat-send');
    if (chatSendBtn && window.sendMessage) {
        chatSendBtn.addEventListener('click', function() {
            console.log('Chat send button clicked');
            window.sendMessage();
        });
    }
    
    // Chat Input Enter Key
    const chatInput = document.getElementById('chat-input');
    if (chatInput && window.sendMessage) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Enter key pressed in chat');
                window.sendMessage();
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
    
    console.log('All event listeners set up successfully!');
}

// Make functions available globally
window.initializeApp = initializeApp;
window.setupEventListeners = setupEventListeners;
