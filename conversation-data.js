// conversation-data.js - ADVANCED CONVERSATION SYSTEM
const conversationSystem = {
    // Expanded conversation scenarios with multiple response options
    scenarios: {
        greeting: [
            {
                triggers: ["hello", "hi", "salve", "ave", "hey"],
                latin: "Salve! Ego Livia Valeria sum. Quid nomen tibi est?",
                english: "Hello! I am Livia Valeria. What is your name?",
                nextTopic: 'name_response'
            },
            {
                triggers: ["good morning", "good afternoon", "good evening"],
                latin: "Salve! Dies pulcher est. Ego Livia Valeria sum. Quis es tu?",
                english: "Hello! It's a beautiful day. I am Livia Valeria. Who are you?",
                nextTopic: 'name_response'
            }
        ],
        
        name_response: [
            {
                triggers: ["name", "nomen", "call", "called"],
                latin: "Salve [NAME]! Nomen pulchrum est. Unde venis?",
                english: "Hello [NAME]! That's a beautiful name. Where are you from?",
                nextTopic: 'origin'
            },
            {
                triggers: ["name", "nomen"],
                latin: "[NAME]... nomen gratum est! Quomodo te habes hodie?",
                english: "[NAME]... what a pleasant name! How are you today?",
                nextTopic: 'feeling'
            }
        ],
        
        feeling: [
            {
                triggers: ["good", "well", "fine", "bene", "happy", "great"],
                latin: "Gaudeo te bene valere! Ego quoque valde bene me habeo. Hodie in horto meo ambulavi.",
                english: "I'm glad you're well! I'm also doing very well. Today I walked in my garden.",
                nextTopic: 'daily_life'
            },
            {
                triggers: ["bad", "tired", "sad", "malus", "not well"],
                latin: "Me paenitet! Spero te melius fore cras. Saepe me adiuvar ambulatione in horto.",
                english: "I'm sorry! I hope you'll be better tomorrow. Walking in the garden often helps me.",
                nextTopic: 'daily_life'
            },
            {
                triggers: ["curious", "interested", "excited"],
                latin: "Gaudium mihi est! Ego quoque sum curiosus de mundo. Visne de Roma audire?",
                english: "That brings me joy! I'm also curious about the world. Would you like to hear about Rome?",
                nextTopic: 'rome'
            }
        ],
        
        origin: [
            {
                triggers: ["rome", "italy", "italia", "roman", "romanus"],
                latin: "Tu es Romanus? Optimē! Ego in villa prope Romam habito. Amasne urbem?",
                english: "You're Roman? Excellent! I live in a villa near Rome. Do you love the city?",
                nextTopic: 'rome'
            },
            {
                triggers: ["america", "europe", "asia", "africa", "germany", "spain", "france"],
                latin: "O! Terra longinqua! Narra mihi de patria tua. Quomodo est vita ibi?",
                english: "Oh! A distant land! Tell me about your country. What is life like there?",
                nextTopic: 'comparison'
            },
            {
                triggers: ["here", "near", "close"],
                latin: "Vicinus es! Spero te visitare Romam aliquando. Urbs magnifica est!",
                english: "You're nearby! I hope you visit Rome sometime. The city is magnificent!",
                nextTopic: 'rome'
            }
        ],
        
        rome: [
            {
                triggers: ["yes", "please", "tell", "roma", "city", "urbs"],
                latin: "Roma urbs maxima est! Heri in Foro Romano fui. Mercatores, senatores, milites... omnes ibi sunt!",
                english: "Rome is the greatest city! Yesterday I was in the Roman Forum. Merchants, senators, soldiers... everyone is there!",
                nextTopic: 'roman_life'
            },
            {
                triggers: ["no", "not", "maybe", "later"],
                latin: "Intellegeo. Saepe solitudinem amo. In villa mea libros Graecos lego. Amasne legere?",
                english: "I understand. I often love solitude. In my villa I read Greek books. Do you like to read?",
                nextTopic: 'hobbies'
            }
        ],
        
        daily_life: [
            {
                triggers: ["garden", "hortus", "walk", "flowers", "rosae"],
                latin: "Hortus meus magnam voluptatem mihi dat. Rosae rubrae et lilium candidum habeo. Amasne flores?",
                english: "My garden gives me great pleasure. I have red roses and white lilies. Do you like flowers?",
                nextTopic: 'nature'
            },
            {
                triggers: ["today", "hodie", "did", "do", "work"],
                latin: "Hodie epistulas scripsi et cum servis de cena locuta sum. Cras ad thermas ire volo. Quid tu cras facere vis?",
                english: "Today I wrote letters and spoke with the servants about dinner. Tomorrow I want to go to the baths. What do you want to do tomorrow?",
                nextTopic: 'future'
            }
        ],
        
        hobbies: [
            {
                triggers: ["read", "books", "librum", "reading"],
                latin: "Optime! Ego philosophiam et poetas amo. Seneca et Vergilius mihi cordi sunt. Quem poetam legis?",
                english: "Excellent! I love philosophy and poets. Seneca and Virgil are dear to me. Which poet do you read?",
                nextTopic: 'literature'
            },
            {
                triggers: ["music", "sing", "cantare", "dance", "saltare"],
                latin: "Musica animam elevat! Ego ipse citharam tangere disco. Canisne aut saltas?",
                english: "Music lifts the soul! I myself am learning to play the lyre. Do you sing or dance?",
                nextTopic: 'arts'
            },
            {
                triggers: ["sports", "exercise", "gymnasium", "run"],
                latin: "Corpus exercere salubre est! Ego in palaestra ambulare soleo. Athletas in Circo Maximo spectare amo.",
                english: "Exercising the body is healthy! I usually walk in the wrestling school. I love watching athletes in the Circus Maximus.",
                nextTopic: 'sports'
            }
        ],
        
        nature: [
            {
                triggers: ["flowers", "flores", "plants", "garden"],
                latin: "Natura deorum donum est. In horto meo multas herbas medicinales colo. Scisne de virtutibus herbarium?",
                english: "Nature is the gift of the gods. In my garden I grow many medicinal herbs. Do you know about the properties of herbs?",
                nextTopic: 'medicine'
            },
            {
                triggers: ["animals", "animalia", "dogs", "cats", "birds"],
                latin: "Animalia sunt comites boni. Ego catulum et aves in cavea habeo. Habesne animalia domestica?",
                english: "Animals are good companions. I have a puppy and birds in a cage. Do you have pets?",
                nextTopic: 'pets'
            }
        ],
        
        // ... and many more scenarios can be added
        
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
                latin: "De hoc numquam cogitaveram. Quid sentis de...?",
                english: "I never thought about that. What do you feel about...?"
            },
            {
                latin: "Hoc mihi placet! Saepe de similibus rebus cogito.",
                english: "I like this! I often think about similar things."
            },
            {
                latin: "Tu es sapiens! Dic mihi quid amplius de vita tua.",
                english: "You are wise! Tell me more about your life."
            }
        ]
    },

    // Advanced response selection based on user input
    getResponse(userMessage, currentContext) {
        const message = userMessage.toLowerCase();
        
        // Extract name if provided
        if (!currentContext.userName) {
            const nameMatch = message.match(/(?:mihi nomen|my name is|nomen mihi est|I am|I'm)\s+([A-Za-z]+)/i);
            if (nameMatch && nameMatch[1]) {
                currentContext.userName = nameMatch[1];
                currentContext.knowsName = true;
            }
        }
        
        // Determine which scenario to use based on triggers
        let bestMatch = null;
        let highestScore = 0;
        
        // Check all scenarios for trigger matches
        for (const [topic, responses] of Object.entries(this.scenarios)) {
            for (const response of responses) {
                if (response.triggers) {
                    const score = this.calculateMatchScore(message, response.triggers);
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = { topic, response };
                    }
                }
            }
        }
        
        // If we have a good match, use it
        if (bestMatch && highestScore > 0.3) {
            currentContext.currentTopic = bestMatch.topic;
            const finalResponse = { ...bestMatch.response };
            
            // Personalize with user's name
            if (currentContext.userName) {
                finalResponse.latin = finalResponse.latin.replace('[NAME]', currentContext.userName);
                finalResponse.english = finalResponse.english.replace('[NAME]', currentContext.userName);
            }
            
            return finalResponse;
        }
        
        // Otherwise, use current topic or default
        const currentTopic = currentContext.currentTopic || 'greeting';
        const currentScenario = this.scenarios[currentTopic];
        
        if (currentScenario) {
            const randomResponse = currentScenario[Math.floor(Math.random() * currentScenario.length)];
            const finalResponse = { ...randomResponse };
            
            if (currentContext.userName) {
                finalResponse.latin = finalResponse.latin.replace('[NAME]', currentContext.userName);
                finalResponse.english = finalResponse.english.replace('[NAME]', currentContext.userName);
            }
            
            return finalResponse;
        }
        
        // Fallback to default
        const randomDefault = this.scenarios.default[Math.floor(Math.random() * this.scenarios.default.length)];
        return randomDefault;
    },
    
    calculateMatchScore(message, triggers) {
        let score = 0;
        for (const trigger of triggers) {
            if (message.includes(trigger)) {
                score += 1;
                // Bonus for longer/more specific triggers
                if (trigger.length > 5) score += 0.5;
            }
        }
        return score;
    },
    
    resetConversation() {
        return {
            userName: null,
            knowsName: false,
            currentTopic: 'greeting',
            conversationDepth: 0
        };
    }
};

// Enhanced suggested responses
const suggestedResponsesData = [
    { latin: "Mihi nomen [Nomen] est", english: "My name is..." },
    { latin: "Bene valeo, gratias! Et tu?", english: "I'm well, thanks! And you?" },
    { latin: "Ex America sum", english: "I'm from America" },
    { latin: "Ex Europa venio", english: "I come from Europe" },
    { latin: "Libros legere amo", english: "I love reading books" },
    { latin: "De Roma narra mihi", english: "Tell me about Rome" },
    { latin: "Quid in horto tuo crescit?", english: "What grows in your garden?" },
    { latin: "Quem poetam legis?", english: "Which poet do you read?" },
    { latin: "Habesne animalia?", english: "Do you have animals?" },
    { latin: "Quid cras facies?", english: "What will you do tomorrow?" },
    { latin: "Quomodo est vita Romana?", english: "What is Roman life like?" },
    { latin: "Quae tempestas tibi placet?", english: "What weather do you like?" }
];
