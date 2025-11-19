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
// ==================== ENHANCED FAKE AI SYSTEM ====================
const latinConversationSystem = {
    userName: null,
    conversationContext: {
        knowsName: false,
        topicsDiscussed: [],
        currentTopic: 'greeting',
        conversationDepth: 0
    },
    
    // Enhanced conversation scenarios
    scenarios: {
        greeting: [
            {
                latin: "Salve! Ego Livia Valeria sum. Quid nomen tibi est?",
                english: "Hello! I am Livia Valeria. What is your name?",
                nextTopic: 'name_response'
            }
        ],
        
        name_response: [
            {
                latin: "Salve [NAME]! Nomen pulchrum est. Quomodo te habes hodie?",
                english: "Hello [NAME]! That's a beautiful name. How are you today?",
                nextTopic: 'daily_life'
            }
        ],
        
        daily_life: [
            {
                latin: "Hodie in horto meo ambulavi. Rosae florent et sol lucet. Quid tu hodie fecisti?",
                english: "Today I walked in my garden. The roses are blooming and the sun is shining. What did you do today?",
                nextTopic: 'roman_life'
            },
            {
                latin: "In villa mea prope Romam habito. Amo tranquillitatem ruris. Ubi tu habitas?",
                english: "I live in my villa near Rome. I love the tranquility of the countryside. Where do you live?",
                nextTopic: 'roman_life'
            }
        ],
        
        roman_life: [
            {
                latin: "Roma urbs magnifica est! Heri in Foro Romano ambulavi. Mercatores multas res vendunt. Visne de vita Romana audire?",
                english: "Rome is a magnificent city! Yesterday I walked in the Roman Forum. Merchants sell many things. Would you like to hear about Roman life?",
                nextTopic: 'culture'
            }
        ],
        
        culture: [
            {
                latin: "Romani multos deos colunt. Ego ipse Minervam, deam sapientiae, adoro. Habesne deos quos colis?",
                english: "Romans worship many gods. I myself worship Minerva, the goddess of wisdom. Do you have gods that you worship?",
                nextTopic: 'philosophy'
            },
            {
                latin: "Libros Graecos legere amo. Philosophia mihi placet. Stoicorum doctrinam studiosius lego. Quid de philosophia sentis?",
                english: "I love reading Greek books. Philosophy pleases me. I study the teachings of the Stoics more diligently. What do you think about philosophy?",
                nextTopic: 'philosophy'
            }
        ],
        
        philosophy: [
            {
                latin: "Seneca dicit: 'Non scholae sed vitae discimus.' Credisne verum esse?",
                english: "Seneca says: 'We learn not for school but for life.' Do you believe this is true?",
                nextTopic: 'learning'
            }
        ],
        
        learning: [
            {
                latin: "Lingua Latina difficilis est, sed pulchra. Quomodo Latinam discis? In schola an solus?",
                english: "The Latin language is difficult, but beautiful. How do you learn Latin? In school or alone?",
                nextTopic: 'farewell'
            }
        ],
        
        farewell: [
            {
                latin: "Tempus mihi discedendi est. Fuit mihi iucundum tecum colloqui, [NAME]. Vale!",
                english: "It is time for me to leave. It was pleasant to speak with you, [NAME]. Farewell!",
                nextTopic: 'greeting'
            }
        ],
        
        default: [
            {
                latin: "Interessant! Narra mihi plura de hac re.",
                english: "Interesting! Tell me more about this."
            },
            {
                latin: "Non intellego perfecte. Possisne id aliter dicere?",
                english: "I don't understand perfectly. Can you say it differently?"
            },
            {
                latin: "De vita tua mihi narra. Quid tibi placet facere?",
                english: "Tell me about your life. What do you like to do?"
            }
        ]
    },
    
    getResponse(userMessage) {
        this.conversationContext.conversationDepth++;
        
        // Extract name if provided
        if (!this.userName && (userMessage.toLowerCase().includes('mihi nomen') || userMessage.toLowerCase().includes('my name is'))) {
            const nameMatch = userMessage.match(/(?:mihi nomen|my name is|nomen mihi est)\s+([A-Za-z]+)/i);
            if (nameMatch && nameMatch[1]) {
                this.userName = nameMatch[1];
                this.conversationContext.knowsName = true;
                this.conversationContext.currentTopic = 'name_response';
            }
        }
        
        // Get current scenario
        const currentScenario = this.scenarios[this.conversationContext.currentTopic];
        if (!currentScenario) {
            const randomDefault = this.scenarios.default[Math.floor(Math.random() * this.scenarios.default.length)];
            return randomDefault;
        }
        
        // Get a response from current scenario
        const response = currentScenario[Math.floor(Math.random() * currentScenario.length)];
        
        // Move to next topic
        if (response.nextTopic && this.conversationContext.conversationDepth > 2) {
            this.conversationContext.currentTopic = response.nextTopic;
            this.conversationContext.conversationDepth = 0;
        }
        
        // Personalize response with user's name
        let finalResponse = {...response};
        if (this.userName) {
            finalResponse.latin = finalResponse.latin.replace('[NAME]', this.userName);
            finalResponse.english = finalResponse.english.replace('[NAME]', this.userName);
        }
        
        return finalResponse;
    },
    
    resetConversation() {
        this.conversationContext = {
            knowsName: false,
            topicsDiscussed: [],
            currentTopic: 'greeting',
            conversationDepth: 0
        };
    }
};

// ==================== CHAT FUNCTIONS ====================
let todaysMessageCount = 0;
const DAILY_MESSAGE_LIMIT = 10;

function isTestUser() {
    return currentUser && TEST_EMAILS.includes(currentUser.email);
}

function canSendMessage() {
    return isTestUser() || todaysMessageCount < DAILY_MESSAGE_LIMIT;
}

function updateMessageCounter() {
    const messageCountElement = document.getElementById('message-count');
    
    if (isTestUser()) {
        messageCountElement.textContent = `${todaysMessageCount} (Unlimited - Test Mode)`;
        messageCountElement.style.color = 'var(--secondary)';
        messageCountElement.classList.add('test-user-badge');
    } else {
        messageCountElement.textContent = `${todaysMessageCount}/${DAILY_MESSAGE_LIMIT}`;
        messageCountElement.style.color = 'var(--light)';
        messageCountElement.classList.remove('test-user-badge');
    }
    
    if (todaysMessageCount >= DAILY_MESSAGE_LIMIT && !isTestUser()) {
        document.getElementById('chat-input').disabled = true;
        document.getElementById('chat-send').disabled = true;
        document.getElementById('daily-limit-message').style.display = 'block';
        document.getElementById('upgrade-prompt').classList.remove('hidden');
    }
}

function addMessage(latinText, englishText, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'message-user' : 'message-bot'}`;
    
    messageDiv.innerHTML = `
        <div class="latin-text">${latinText}</div>
        <div class="translation">${englishText}</div>
    `;
    
    document.getElementById('chat-messages').appendChild(messageDiv);
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    
    // Track conversation in Supabase
    if (currentUser && latinText) {
        trackMessage(currentUser.id, latinText, englishText, isUser).then(newCount => {
            if (newCount > 0) {
                todaysMessageCount = newCount;
                updateMessageCounter();
            }
        });
    }
}

function showTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'block';
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'none';
}

function sendMessage() {
    const message = document.getElementById('chat-input').value.trim();
    if (!message) return;
    
    if (!canSendMessage()) {
        document.getElementById('daily-limit-message').style.display = 'block';
        return;
    }
    
    // Add user message
    addMessage(message, "Your message", true);
    document.getElementById('chat-input').value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI thinking with enhanced response
    setTimeout(() => {
        hideTypingIndicator();
        const response = latinConversationSystem.getResponse(message);
        addMessage(response.latin, response.english, false);
        
        // Update suggested responses based on conversation
        updateSuggestedResponses();
    }, 1500 + Math.random() * 1000);
}

function updateSuggestedResponses() {
    // Rotate suggested responses based on conversation context
    const suggestions = [
        { latin: "Quid hodie fecisti?", english: "What did you do today?" },
        { latin: "De familia tua narra", english: "Tell me about your family" },
        { latin: "Quae animalia amas?", english: "Which animals do you like?" },
        { latin: "Ubi habitas?", english: "Where do you live?" },
        { latin: "Quid in futuro facere vis?", english: "What do you want to do in the future?" },
        { latin: "Quae tempestas tibi placet?", english: "What weather do you like?" }
    ];
    
    // Shuffle and pick 3
    const shuffled = suggestions.sort(() => 0.5 - Math.random());
    const suggestedResponses = document.getElementById('suggested-responses');
    suggestedResponses.innerHTML = '';
    
    shuffled.slice(0, 3).forEach(suggestion => {
        const button = document.createElement('button');
        button.className = 'suggestion-btn';
        button.textContent = suggestion.english;
        button.setAttribute('data-latin', suggestion.latin);
        suggestedResponses.appendChild(button);
    });
}

async function loadUserData() {
    if (currentUser) {
        todaysMessageCount = await loadUserData(currentUser.id);
        updateMessageCounter();
    }
}
