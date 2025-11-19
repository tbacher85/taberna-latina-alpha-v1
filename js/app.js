// ==================== MAIN APPLICATION LOGIC ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('App starting...');
    // Auth will initialize itself via its own DOMContentLoaded listener
    setupEventListeners();
    updateSuggestedResponses();
});

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Your existing event listeners...
    document.getElementById('google-auth-btn').addEventListener('click', signInWithGoogle);
    document.getElementById('email-auth-btn').addEventListener('click', function() {
        document.getElementById('email-auth-form').style.display = 'block';
    });
    document.getElementById('send-magic-link').addEventListener('click', function() {
        const email = document.getElementById('email-input').value.trim();
        if (email) signInWithEmail(email);
    });
    document.getElementById('logout-btn').addEventListener('click', signOut);
    
    // Chat event listeners
    document.getElementById('chat-send').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Suggested responses
    document.getElementById('suggested-responses').addEventListener('click', (e) => {
        if (e.target.classList.contains('suggestion-btn')) {
            const latinText = e.target.getAttribute('data-latin');
            if (latinText.includes('[Nomen]')) {
                const name = prompt('Please enter your name:');
                if (name) {
                    window.latinConversationSystem.userName = name;
                    document.getElementById('chat-input').value = latinText.replace('[Nomen]', name);
                }
            } else {
                document.getElementById('chat-input').value = latinText;
            }
        }
    });
    
    // Upgrade form
    document.getElementById('upgrade-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you about premium features soon.');
        this.submit();
    });
}
