// conversation-data.js - COMPREHENSIVE NATURAL CONVERSATION SYSTEM
const conversationSystem = {
    // Comprehensive conversation flow with empathy and flexibility
    scenarios: {
        // ========== GREETING & INTRODUCTION ==========
        greeting: [
            {
                triggers: ["hello", "hi", "salve", "ave", "hey", "greetings"],
                latin: "Salve! Ego Livia Valeria sum. Quid nomen tibi est?",
                english: "Hello! I am Livia Valeria. What is your name?",
                nextTopic: 'name_response',
                empathy: "warm"
            },
            {
                triggers: ["good morning", "bonum mane"],
                latin: "Salve! Sol oritur et dies novus incipit. Quid nomen tibi est?",
                english: "Hello! The sun rises and a new day begins. What is your name?",
                nextTopic: 'name_response',
                empathy: "cheerful"
            },
            {
                triggers: ["good evening", "bonum vesperum"],
                latin: "Salve! Nox appropinquat. Ego Livia sum. Quis es tu?",
                english: "Hello! Night approaches. I am Livia. Who are you?",
                nextTopic: 'name_response',
                empathy: "calm"
            }
        ],
        
        // ========== NAME HANDLING (FLEXIBLE) ==========
        name_response: [
            {
                triggers: ["name", "nomen", "call", "called", "i am", "i'm", "me", "myself"],
                latin: "Salve [NAME]! Nomen dulce est. Unde venis, amice?",
                english: "Hello [NAME]! That's a sweet name. Where do you come from, friend?",
                nextTopic: 'origin',
                empathy: "friendly"
            },
            {
                triggers: ["nescio", "don't know", "not sure", "forgot"],
                latin: "Non est problema! Potes mihi nomen tuum dicere cum voles. Unde venis?",
                english: "No problem! You can tell me your name whenever you want. Where are you from?",
                nextTopic: 'origin',
                empathy: "understanding"
            },
            {
                triggers: ["secret", "private", "won't tell"],
                latin: "Intellego. Saepe nomina secreta sunt. Unde in orbe terrarum venis?",
                english: "I understand. Names are often private. Where in the world do you come from?",
                nextTopic: 'origin',
                empathy: "respectful"
            }
        ],
        
        // ========== ORIGIN & BACKGROUND ==========
        origin: [
            {
                triggers: ["rome", "italy", "italia", "roman", "romanus", "from rome", "ex roma"],
                latin: "Tu es Romanus? Mirabile! Ego in villa prope Romam habito. Amasne urbem nostram?",
                english: "You're Roman? Wonderful! I live in a villa near Rome. Do you love our city?",
                nextTopic: 'rome_love',
                empathy: "excited"
            },
            {
                triggers: ["america", "united states", "us", "usa", "canada"],
                latin: "O! Terra trans mare! Audivi terras illas esse ingentes. Quomodo est vita in America?",
                english: "Oh! Lands across the sea! I've heard those lands are vast. What is life like in America?",
                nextTopic: 'life_comparison',
                empathy: "curious"
            },
            {
                triggers: ["europe", "germany", "germania", "france", "gallia", "spain", "hispania", "britain", "britannia"],
                latin: "Provinciae Romanae! Estne vita ibi similis vitae Romanae?",
                english: "Roman provinces! Is life there similar to Roman life?",
                nextTopic: 'life_comparison',
                empathy: "interested"
            },
            {
                triggers: ["asia", "china", "sinae", "india", "japan"],
                latin: "Terras orientales! Mercatores de silk road narrant. Estne terra pulchra?",
                english: "Eastern lands! Merchants tell stories about the silk road. Is it a beautiful land?",
                nextTopic: 'culture_exchange',
                empathy: "fascinated"
            },
            {
                triggers: ["here", "near", "close", "vicinus", "same place"],
                latin: "Vicinus es! Spero te visitare Romam aliquando. Urbs magnifica est!",
                english: "You're nearby! I hope you visit Rome sometime. The city is magnificent!",
                nextTopic: 'rome_invitation',
                empathy: "welcoming"
            },
            {
                triggers: ["nowhere", "unknown", "not from here"],
                latin: "Omnes alicunde veniunt. Mihi de loco tuo narra. Qualis est?",
                english: "Everyone comes from somewhere. Tell me about your place. What is it like?",
                nextTopic: 'place_description',
                empathy: "encouraging"
            }
        ],
        
        // ========== FEELINGS & CURRENT STATE ==========
        feeling: [
            {
                triggers: ["good", "well", "fine", "bene", "happy", "great", "ok", "okay", "not bad"],
                latin: "Gaudeo te bene valere! Hodie in horto meo rosas colui. Quid tu hodie fecisti?",
                english: "I'm glad you're well! Today I cultivated roses in my garden. What did you do today?",
                nextTopic: 'daily_activities',
                empathy: "shared_joy"
            },
            {
                triggers: ["bad", "tired", "sad", "malus", "not well", "exhausted", "stress", "anxious"],
                latin: "Me paenitet audire. Saepe me adiuvat ambulatio in horto vel lectio librorum. Tibi quid adiuvat?",
                english: "I'm sorry to hear that. Walking in the garden or reading books often helps me. What helps you?",
                nextTopic: 'comfort',
                empathy: "compassionate"
            },
            {
                triggers: ["curious", "interested", "excited", "bored", "lonely"],
                latin: "Intellegeo hos sensus. Ego quoque saepe sum curiosus. Visne de vita Romana audire?",
                english: "I understand these feelings. I'm also often curious. Would you like to hear about Roman life?",
                nextTopic: 'roman_life',
                empathy: "understanding"
            },
            {
                triggers: ["confused", "lost", "nescio", "don't know"],
                latin: "Aliquando etiam ego confundor. Noli timere! Loquamur de rebus simplicibus. Quid tibi placet facere?",
                english: "Sometimes I get confused too. Don't worry! Let's talk about simple things. What do you like to do?",
                nextTopic: 'hobbies',
                empathy: "reassuring"
            }
        ],
        
        // ========== ROMAN LIFE & CULTURE ==========
        rome_love: [
            {
                triggers: ["yes", "love", "amo", "like", "beautiful", "pulchra"],
                latin: "Gaudeo! Roma cor imperii est. Heri in Foro Romano fui - mercatores, senatores, milites... omnes ibi sunt!",
                english: "I'm glad! Rome is the heart of the empire. Yesterday I was in the Roman Forum - merchants, senators, soldiers... everyone is there!",
                nextTopic: 'roman_life',
                empathy: "enthusiastic"
            },
            {
                triggers: ["no", "never", "not", "haven't", "non"],
                latin: "Ah, forsan aliquando visites! Urbs habet multa mirabilia: templa, thermas, Circum Maximum...",
                english: "Ah, perhaps you'll visit sometime! The city has many wonders: temples, baths, Circus Maximus...",
                nextTopic: 'rome_attractions',
                empathy: "hopeful"
            }
        ],
        
        roman_life: [
            {
                triggers: ["forum", "foro", "mercatores", "senatores", "milites", "life", "vita", "roman life", "de roma"],
                latin: "In Foro cotidie multa fiunt. Mercatores olivas, vinum, vestes vendunt. Senatores de republica disputant. Et milites per vias ambulant.",
                english: "Many things happen daily in the Forum. Merchants sell olives, wine, clothes. Senators debate about the republic. And soldiers walk through the streets.",
                nextTopic: 'daily_schedule',
                empathy: "descriptive"
            },
            {
                triggers: ["what", "how", "tell", "describe", "explain", "narra"],
                latin: "Vita Romana varia est! Mane cibum sumimus, deinde aut in thermas aut in forum imus. Saepe amicos visimus et cenam paramus.",
                english: "Roman life is varied! In the morning we eat food, then we go either to the baths or to the forum. We often visit friends and prepare dinner.",
                nextTopic: 'daily_schedule',
                empathy: "explanatory"
            }
        ],
        
        rome_attractions: [
            {
                triggers: ["tell", "more", "what", "attractions", "mirabilia"],
                latin: "Roma plena est miraculorum! Colosseum ubi gladiatores pugnant, Pantheon ubi deos adoramus, thermae ubi lavamus et socializamus...",
                english: "Rome is full of wonders! The Colosseum where gladiators fight, the Pantheon where we worship gods, baths where we wash and socialize...",
                nextTopic: 'roman_entertainment',
                empathy: "proud"
            }
        ],
        
        // ========== DAILY LIFE & ACTIVITIES ==========
        daily_activities: [
            {
                triggers: ["work", "labor", "job", "office", "school", "schola"],
                latin: "Intellegeo. Ego quoque habeo responsabilitates. Epistulas scribo, hortum colo, familiam gero. Quid in tuo opere facis?",
                english: "I understand. I also have responsibilities. I write letters, cultivate the garden, manage the family. What do you do in your work?",
                nextTopic: 'work_life',
                empathy: "relatable"
            },
            {
                triggers: ["nothing", "nihil", "rest", "relax", "lazy"],
                latin: "Aliquando otium est bonum! Ego quoque amo quietem in horto meo. Quid facis cum quiescis?",
                english: "Sometimes rest is good! I also love quiet time in my garden. What do you do when you rest?",
                nextTopic: 'hobbies',
                empathy: "approving"
            },
            {
                triggers: ["garden", "hortus", "walk", "flowers", "rosae", "plants", "nature"],
                latin: "Hortus meus magnam voluptatem mihi dat! Rosae rubrae et lilium candidum habeo. Amasne flores?",
                english: "My garden gives me great pleasure! I have red roses and white lilies. Do you like flowers?",
                nextTopic: 'nature',
                empathy: "shared_interest"
            }
        ],
        
        daily_schedule: [
            {
                triggers: ["morning", "mane", "breakfast", "prandium"],
                latin: "Mane surgo et primum cibum sumo: panem, caseum, olivas. Deinde aut lego aut in horto laboro.",
                english: "In the morning I rise and eat first meal: bread, cheese, olives. Then I either read or work in the garden.",
                nextTopic: 'afternoon_activities',
                empathy: "routine"
            }
        ],
        
        // ========== HOBBIES & INTERESTS ==========
        hobbies: [
            {
                triggers: ["read", "books", "librum", "reading", "legere"],
                latin: "Optime! Ego philosophiam et poetas amo. Seneca et Vergilius mihi cordi sunt. Quem poetam legis?",
                english: "Excellent! I love philosophy and poets. Seneca and Virgil are dear to me. Which poet do you read?",
                nextTopic: 'literature',
                empathy: "enthusiastic"
            },
            {
                triggers: ["music", "sing", "cantare", "dance", "saltare", "lyre", "citharam"],
                latin: "Musica animam elevat! Ego ipse citharam tangere disco. Canisne aut saltas?",
                english: "Music lifts the soul! I myself am learning to play the lyre. Do you sing or dance?",
                nextTopic: 'arts',
                empathy: "artistic"
            },
            {
                triggers: ["sports", "exercise", "gymnasium", "run", "athletes", "circus", "games"],
                latin: "Corpus exercere salubre est! Ego in palaestra ambulare soleo. Athletas in Circo Maximo spectare amo.",
                english: "Exercising the body is healthy! I usually walk in the wrestling school. I love watching athletes in the Circus Maximus.",
                nextTopic: 'sports',
                empathy: "energetic"
            },
            {
                triggers: ["tv", "movies", "video", "computer", "phone", "internet"],
                latin: "Haec mihi ignota sunt! In Roma, fabulas in theatro spectamus aut inter nos colloquimur. Quales fabulas narras?",
                english: "These are unknown to me! In Rome, we watch stories in the theater or talk with each other. What kind of stories do you tell?",
                nextTopic: 'stories',
                empathy: "curious"
            },
            {
                triggers: ["cook", "food", "cena", "bake", "kitchen"],
                latin: "Cenam parare mihi placet! Pultem, carnes, pisces, et multas legumes coquere scio. Tu quoque coquis?",
                english: "I enjoy preparing dinner! I know how to cook porridge, meats, fish, and many vegetables. Do you cook too?",
                nextTopic: 'food',
                empathy: "culinary"
            }
        ],
        
        // ========== COMFORT & SUPPORT ==========
        comfort: [
            {
                triggers: ["walk", "nature", "friends", "family", "music", "read"],
                latin: "Bona remedia! Ego quoque his rebus adiutor. Amici et familia semper nos adiuvant. Habesne amicos propinquos?",
                english: "Good remedies! I'm also helped by these things. Friends and family always help us. Do you have close friends?",
                nextTopic: 'friendship',
                empathy: "supportive"
            },
            {
                triggers: ["don't know", "nescio", "nothing", "nihil"],
                latin: "Aliquando difficile est. Forsan ambulatio in natura te adiuvet? Aut novum hobby invenire?",
                english: "Sometimes it's difficult. Perhaps walking in nature would help you? Or finding a new hobby?",
                nextTopic: 'suggestions',
                empathy: "helpful"
            }
        ],
        
        // ========== DEFAULT & FALLBACK RESPONSES ==========
        default: [
            {
                latin: "Interessant! Narra mihi plura de hac re.",
                english: "Interesting! Tell me more about this.",
                empathy: "curious"
            },
            {
                latin: "Non intellego perfecte. Possisne id aliter dicere?",
                english: "I don't understand perfectly. Can you say it differently?",
                empathy: "patient"
            },
            {
                latin: "De hoc numquam cogitaveram. Quid sentis de vita tua?",
                english: "I never thought about that. What do you feel about your life?",
                empathy: "reflective"
            },
            {
                latin: "Hoc mihi placet! Saepe de similibus rebus cogito.",
                english: "I like this! I often think about similar things.",
                empathy: "engaged"
            },
            {
                latin: "Tu es sapiens! Dic mihi quid amplius de te ipso.",
                english: "You are wise! Tell me more about yourself.",
                empathy: "admiring"
            },
            {
                latin: "Intellegeo quod dicis. Vita plena mysteriorum est.",
                english: "I understand what you're saying. Life is full of mysteries.",
                empathy: "philosophical"
            }
        ]
    },

    // Advanced response selection with empathy and context
    getResponse(userMessage, currentContext) {
        const message = userMessage.toLowerCase().trim();
        
        console.log("User message:", message);
        
        // ========== FLEXIBLE NAME EXTRACTION ==========
        if (!currentContext.userName) {
            // Multiple patterns for name extraction
            const namePatterns = [
                /(?:mihi nomen est|my name is|I am|I'm|nomen mihi est|me vocant|they call me)\s+([A-Za-z]+)/i,
                /^([A-Za-z]{2,})$/i, // Just a single word (name)
                /(?:I'm|I am)\s+([A-Za-z]+)/i,
                /^([A-Za-z]+)$/i, // Just their name as response
            ];
            
            for (const pattern of namePatterns) {
                const nameMatch = message.match(pattern);
                if (nameMatch && nameMatch[1]) {
                    currentContext.userName = nameMatch[1];
                    currentContext.knowsName = true;
                    console.log("Extracted name:", currentContext.userName);
                    break;
                }
            }
        }
        
        // ========== EMPATHY & EMOTION DETECTION ==========
        const emotion = this.detectEmotion(message);
        console.log("Detected emotion:", emotion);
        
        // ========== TOPIC MATCHING WITH EMPATHY ==========
        let bestMatch = null;
        let highestScore = 0;
        
        for (const [topic, responses] of Object.entries(this.scenarios)) {
            for (const response of responses) {
                if (response.triggers) {
                    const score = this.calculateMatchScore(message, response.triggers, emotion, response.empathy);
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = { topic, response };
                    }
                }
            }
        }
        
        // ========== RESPONSE SELECTION ==========
        let selectedResponse;
        
        if (bestMatch && highestScore > 0.2) { // Lower threshold for more flexibility
            currentContext.currentTopic = bestMatch.topic;
            selectedResponse = { ...bestMatch.response };
            console.log("Selected response from topic:", bestMatch.topic, "score:", highestScore);
        } else {
            // Use current topic or default
            const currentTopic = currentContext.currentTopic || 'greeting';
            const currentScenario = this.scenarios[currentTopic];
            
            if (currentScenario) {
                const randomResponse = currentScenario[Math.floor(Math.random() * currentScenario.length)];
                selectedResponse = { ...randomResponse };
                console.log("Selected response from current topic:", currentTopic);
            } else {
                // Fallback to default with emotion consideration
                const defaultResponses = this.scenarios.default.filter(r => 
                    !emotion || r.empathy !== 'negative'
                );
                selectedResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
                console.log("Selected default response");
            }
        }
        
        // ========== RESPONSE PERSONALIZATION ==========
        if (currentContext.userName) {
            selectedResponse.latin = selectedResponse.latin.replace(/\[NAME\]/g, currentContext.userName);
            selectedResponse.english = selectedResponse.english.replace(/\[NAME\]/g, currentContext.userName);
        }
        
        // Add emotional tone if detected
        if (emotion && !selectedResponse.empathy) {
            selectedResponse.empathy = emotion;
        }
        
        return selectedResponse;
    },
    
    detectEmotion(message) {
        const positiveWords = ["happy", "good", "well", "great", "love", "joy", "excited", "bene", "gaudeo", "amo"];
        const negativeWords = ["sad", "bad", "tired", "angry", "stress", "anxious", "malus", "tristis", "fessus"];
        const confusedWords = ["confused", "lost", "don't know", "nescio", "help", "what", "how"];
        
        let positive = 0, negative = 0, confused = 0;
        
        positiveWords.forEach(word => { if (message.includes(word)) positive++; });
        negativeWords.forEach(word => { if (message.includes(word)) negative++; });
        confusedWords.forEach(word => { if (message.includes(word)) confused++; });
        
        if (negative > positive && negative > confused) return "compassionate";
        if (confused > positive && confused > negative) return "patient";
        if (positive > negative && positive > confused) return "joyful";
        
        return "neutral";
    },
    
    calculateMatchScore(message, triggers, emotion, responseEmpathy) {
        let score = 0;
        
        // Basic trigger matching
        for (const trigger of triggers) {
            if (message.includes(trigger)) {
                score += 1;
                // Bonus for longer/more specific triggers
                if (trigger.length > 5) score += 0.5;
                // Extra bonus for exact matches
                if (message === trigger) score += 2;
            }
        }
        
        // Emotional alignment bonus
        if (emotion && responseEmpathy) {
            const empathyMap = {
                "compassionate": ["sad", "bad", "tired", "angry"],
                "joyful": ["happy", "good", "excited"],
                "patient": ["confused", "lost", "don't know"]
            };
            
            if (empathyMap[responseEmpathy] && empathyMap[responseEmpathy].some(e => emotion.includes(e))) {
                score += 1.5;
            }
        }
        
        return score;
    },
    
    resetConversation() {
        return {
            userName: null,
            knowsName: false,
            currentTopic: 'greeting',
            conversationDepth: 0,
            emotionalState: 'neutral'
        };
    }
};

// Enhanced suggested responses with emotional variety
const suggestedResponsesData = [
    // Name-related
    { latin: "Mihi nomen [Nomen] est", english: "My name is..." },
    { latin: "Tim", english: "Just say your name" },
    { latin: "Nescio", english: "I don't know" },
    
    // Feelings
    { latin: "Bene valeo!", english: "I'm doing well!" },
    { latin: "Fatigatus sum", english: "I'm tired" },
    { latin: "Laetus sum", english: "I'm happy" },
    { latin: "Tristis sum", english: "I'm sad" },
    
    // Origins
    { latin: "Ex America sum", english: "I'm from America" },
    { latin: "Ex Europa venio", english: "I come from Europe" },
    { latin: "Hic habito", english: "I live here" },
    
    // Interests
    { latin: "Libros legere amo", english: "I love reading books" },
    { latin: "Musica me delectat", english: "Music delights me" },
    { latin: "Athleta sum", english: "I'm an athlete" },
    
    // Rome-specific
    { latin: "De Roma narra mihi", english: "Tell me about Rome" },
    { latin: "Roma est pulchra", english: "Rome is beautiful" },
    { latin: "Numquam Romam vidi", english: "I've never seen Rome" },
    
    // Daily life
    { latin: "Quid in horto tuo crescit?", english: "What grows in your garden?" },
    { latin: "Quem poetam legis?", english: "Which poet do you read?" },
    { latin: "Habesne animalia?", english: "Do you have animals?" },
    { latin: "Quid cras facies?", english: "What will you do tomorrow?" },
    
    // Deeper questions
    { latin: "Quomodo est vita Romana?", english: "What is Roman life like?" },
    { latin: "Quae tempestas tibi placet?", english: "What weather do you like?" },
    { latin: "De familia tua narra", english: "Tell me about your family" },
    { latin: "Ubi habitas?", english: "Where do you live?" },
    
    // Emotional
    { latin: "Me adiuvas", english: "You're helping me" },
    { latin: "Gratias tibi ago", english: "Thank you" },
    { latin: "Non intellego", english: "I don't understand" }
];
