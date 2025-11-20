// conversation-data.js - LIVIA-DRIVEN CONVERSATION FLOW
// Livia asks questions, user responds with suggested answers, Livia acknowledges and moves forward

const conversationSystem = {
    currentStep: 0,
    userName: null,
    
    // LIVIA-DRIVEN CONVERSATION: She asks, user responds, she acknowledges and moves on
    conversationSteps: [
        // ===== STEP 1: WARM INTRODUCTION =====
        {
            id: 1,
            question: {
                latin: "Salve! Ego Livia Valeria sum, patricia Romana. Quid nomen tibi est?",
                english: "Hello! I am Livia Valeria, a Roman noblewoman. What is your name?"
            },
            responses: [
                {
                    type: "name_provided",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Salve {name}! Nomen dulce sonat. Gaudeo te cognoscere!",
                        english: "Hello {name}! That name sounds sweet. Pleased to meet you!"
                    }
                }
            ],
            suggestions: [
                { latin: "Mihi nomen Tim est", english: "My name is Tim" },
                { latin: "Maria mihi nomen est", english: "My name is Maria" },
                { latin: "Marcus", english: "Marcus" }
            ],
            nextStep: 2
        },

        // ===== STEP 2: ORIGIN DISCOVERY =====
        {
            id: 2,
            question: {
                latin: "{name}, unde in orbe terrarum venis? Roma an provincia?",
                english: "{name}, where in the world do you come from? Rome or a province?"
            },
            responses: [
                {
                    type: "from_rome",
                    pattern: /(rome|italia|roman)/i,
                    acknowledgment: {
                        latin: "Ah, civis Romanus! Optime! Urbs nostra te salutat.",
                        english: "Ah, a Roman citizen! Excellent! Our city greets you."
                    }
                },
                {
                    type: "from_province",
                    pattern: /(gallia|hispania|britannia|graecia|aegyptus)/i,
                    acknowledgment: {
                        latin: "Ex provincia! Audivi terras illas esse pulchras. Narra mihi plus!",
                        english: "From a province! I've heard those lands are beautiful. Tell me more!"
                    }
                },
                {
                    type: "from_far",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Locus novus et interesting! Mundus tam vastus est.",
                        english: "A new and interesting place! The world is so vast."
                    }
                }
            ],
            suggestions: [
                { latin: "Ex Roma", english: "From Rome" },
                { latin: "Ex Gallia", english: "From Gaul" },
                { latin: "Ex Britannia", english: "From Britain" },
                { latin: "Ex terra longinqua", english: "From a distant land" }
            ],
            nextStep: 3
        },

        // ===== STEP 3: CURRENT FEELING =====
        {
            id: 3,
            question: {
                latin: "Dic mihi, {name}, quomodo te hodie sentis? Animus tuus quomodo se habet?",
                english: "Tell me, {name}, how are you feeling today? How is your spirit?"
            },
            responses: [
                {
                    type: "feeling_good",
                    pattern: /(bene|happy|laetus|good|well)/i,
                    acknowledgment: {
                        latin: "Laetitia tua me etiam beatum facit! Sol lucet etiam pro te.",
                        english: "Your happiness makes me happy too! The sun shines for you as well."
                    }
                },
                {
                    type: "feeling_tired",
                    pattern: /(fatigatus|tired|fessus)/i,
                    acknowledgment: {
                        latin: "Intellegeo. Saepe etiam ego fessa sum. Requiesce et renascere!",
                        english: "I understand. I often get tired too. Rest and be reborn!"
                    }
                },
                {
                    type: "feeling_curious",
                    pattern: /(curiosus|curious|interested)/i,
                    acknowledgment: {
                        latin: "Curiositas signum animi vividi est! Placet mihi!",
                        english: "Curiosity is a sign of a vivid soul! I like it!"
                    }
                },
                {
                    type: "default_feeling",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Sensus tui interesting sunt. Vita habet multos colores.",
                        english: "Your feelings are interesting. Life has many colors."
                    }
                }
            ],
            suggestions: [
                { latin: "Bene me habeo!", english: "I'm doing well!" },
                { latin: "Fatigatus sum", english: "I'm tired" },
                { latin: "Curiosus sum", english: "I'm curious" },
                { latin: "Nescio", english: "I'm not sure" }
            ],
            nextStep: 4
        },

        // ===== STEP 4: ROMAN LIFE INTRODUCTION =====
        {
            id: 4,
            question: {
                latin: "Visne audire de vita mea Romana? Quomodo ego et familia mea vivimus?",
                english: "Would you like to hear about my Roman life? How I and my family live?"
            },
            responses: [
                {
                    type: "yes_roman_life",
                    pattern: /(yes|certe|volo|please)/i,
                    acknowledgment: {
                        latin: "Optime! Vita Romana plena est traditionum et rituum mirabilium.",
                        english: "Excellent! Roman life is full of wonderful traditions and rituals."
                    }
                },
                {
                    type: "no_roman_life",
                    pattern: /(no|nunc non|maybe)/i,
                    acknowledgment: {
                        latin: "Intellegeo. Sunt multae aliae res de quibus loqui possumus.",
                        english: "I understand. There are many other things we can talk about."
                    }
                },
                {
                    type: "default_roman",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Interessant responsum! Forsitan de aliis rebus loquamur.",
                        english: "Interesting response! Perhaps we'll talk about other things."
                    }
                }
            ],
            suggestions: [
                { latin: "Certe! Narra mihi", english: "Certainly! Tell me" },
                { latin: "Maxime volo!", english: "I really want to!" },
                { latin: "Alio tempore", english: "Another time" }
            ],
            nextStep: 5
        },

        // ===== STEP 5: DAILY ACTIVITIES =====
        {
            id: 5,
            question: {
                latin: "Quid soletis facere in vita cotidiana? Laboratis an studetis?",
                english: "What do you usually do in daily life? Do you work or study?"
            },
            responses: [
                {
                    type: "work",
                    pattern: /(work|labor|job)/i,
                    acknowledgment: {
                        latin: "Labor te nobilitat! Ego quoque habeo multas responsabilitates.",
                        english: "Work ennobles you! I also have many responsibilities."
                    }
                },
                {
                    type: "study",
                    pattern: /(study|disco|schola)/i,
                    acknowledgment: {
                        latin: "Studium mentem acuit! Semper discere bonum est.",
                        english: "Study sharpens the mind! It's always good to learn."
                    }
                },
                {
                    type: "both",
                    pattern: /(both|et|and)/i,
                    acknowledgment: {
                        latin: "Duplex vita! Labor et studium - haec te completum faciunt.",
                        english: "A double life! Work and study - these make you complete."
                    }
                },
                {
                    type: "default_activities",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Vita tua interesting sonat! Omnes habemus vias diversas.",
                        english: "Your life sounds interesting! We all have different paths."
                    }
                }
            ],
            suggestions: [
                { latin: "Laboro", english: "I work" },
                { latin: "Disco", english: "I study" },
                { latin: "Et laboro et disco", english: "Both work and study" },
                { latin: "Aliud", english: "Something else" }
            ],
            nextStep: 6
        },

        // ===== STEP 6: ROMAN CULTURE =====
        {
            id: 6,
            question: {
                latin: "Quae pars culturae Romanae te maxime fascinat? Gladiatores? Dei? Architectura?",
                english: "Which part of Roman culture fascinates you most? Gladiators? Gods? Architecture?"
            },
            responses: [
                {
                    type: "gladiators",
                    pattern: /(gladiator|colosseum|pugna)/i,
                    acknowledgment: {
                        latin: "Ah, gladiatores! Fortitudo et honor in arena! Populus exultat!",
                        english: "Ah, gladiators! Courage and honor in the arena! The people cheer!"
                    }
                },
                {
                    type: "gods",
                    pattern: /(dei|gods|minos|religio)/i,
                    acknowledgment: {
                        latin: "Dei Romani! Iuppiter, Minerva, Mars... numquam nos deserunt.",
                        english: "Roman gods! Jupiter, Minerva, Mars... they never abandon us."
                    }
                },
                {
                    type: "architecture",
                    pattern: /(architectura|buildings|templa|aquaeductus)/i,
                    acknowledgment: {
                        latin: "Architectura nostra aeternal! Roma aeterna manebit!",
                        english: "Our architecture is eternal! Rome will remain eternal!"
                    }
                },
                {
                    type: "default_culture",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Pars interesting! Cultura Romana multas habet facies mirabiles.",
                        english: "Interesting part! Roman culture has many wonderful aspects."
                    }
                }
            ],
            suggestions: [
                { latin: "Gladiatores", english: "Gladiators" },
                { latin: "Dei Romani", english: "Roman gods" },
                { latin: "Architectura", english: "Architecture" },
                { latin: "Omnia", english: "Everything" }
            ],
            nextStep: 7
        },

        // ===== STEP 7: PERSONAL PHILOSOPHY =====
        {
            id: 7,
            question: {
                latin: "Seneca dicit: 'Fortuna non est, ubi ratio est.' Credisne fortunam an rationem plus valere?",
                english: "Seneca says: 'Where there is reason, there is no fortune.' Do you believe fortune or reason is stronger?"
            },
            responses: [
                {
                    type: "reason",
                    pattern: /(ratio|reason|logic)/i,
                    acknowledgment: {
                        latin: "Sapienter! Ratio nos ducit, fortuna tantum ludit.",
                        english: "Wisely! Reason leads us, fortune only plays."
                    }
                },
                {
                    type: "fortune",
                    pattern: /(fortuna|luck|chance)/i,
                    acknowledgment: {
                        latin: "Fortuna rotam volvit! Saepe casus plus potest quam consilium.",
                        english: "Fortune turns the wheel! Often chance has more power than planning."
                    }
                },
                {
                    type: "both",
                    pattern: /(both|et|ambo)/i,
                    acknowledgment: {
                        latin: "Responsum aequum! Ratio et fortuna inter se ludunt.",
                        english: "A balanced answer! Reason and fortune play with each other."
                    }
                },
                {
                    type: "default_philosophy",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Profunda quaestio! Tempore omnia intellegemus.",
                        english: "Deep question! With time we will understand everything."
                    }
                }
            ],
            suggestions: [
                { latin: "Ratio plus valet", english: "Reason is stronger" },
                { latin: "Fortuna plus valet", english: "Fortune is stronger" },
                { latin: "Ambo important", english: "Both are important" },
                { latin: "Nescio", english: "I don't know" }
            ],
            nextStep: 8
        },

        // ===== STEP 8: NATURE & GARDEN =====
        {
            id: 8,
            question: {
                latin: "In horto meo multae herbae et flores crescunt. Amasne naturam et eius dona?",
                english: "In my garden many herbs and flowers grow. Do you love nature and its gifts?"
            },
            responses: [
                {
                    type: "love_nature",
                    pattern: /(yes|amo|love|like)/i,
                    acknowledgment: {
                        latin: "Gaudeo! Natura est donum deorum. In horto meo pacem invenio.",
                        english: "I'm glad! Nature is the gift of the gods. In my garden I find peace."
                    }
                },
                {
                    type: "indifferent_nature",
                    pattern: /(no|non|not really)/i,
                    acknowledgment: {
                        latin: "Intellegeo. Non omnes eadem amant. Fortasse urbem praefers?",
                        english: "I understand. Not everyone loves the same things. Perhaps you prefer the city?"
                    }
                },
                {
                    type: "default_nature",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Responsum interesting! Natura semper nova mirabilia offert.",
                        english: "Interesting answer! Nature always offers new wonders."
                    }
                }
            ],
            suggestions: [
                { latin: "Naturam amo!", english: "I love nature!" },
                { latin: "Non multum curo", english: "I don't care much" },
                { latin: "Interdum", english: "Sometimes" }
            ],
            nextStep: 9
        },

        // ===== STEP 9: FINAL REFLECTION =====
        {
            id: 9,
            question: {
                latin: "Colloquium nostrum brevi finietur. Quid de hoc dialogo sentis, {name}?",
                english: "Our conversation will end soon. How do you feel about this dialogue, {name}?"
            },
            responses: [
                {
                    type: "enjoyed",
                    pattern: /(bene|good|enjoyed|liked)/i,
                    acknowledgment: {
                        latin: "Gaudeo! Mihi quoque placuit tecum colloqui. Memoria dulcis manebit.",
                        english: "I'm glad! I also enjoyed speaking with you. The memory will remain sweet."
                    }
                },
                {
                    type: "learned",
                    pattern: /(learned|disco|new)/i,
                    acknowledgment: {
                        latin: "Discere semper bonum est! Spero te aliquid novi didicisse.",
                        english: "Learning is always good! I hope you learned something new."
                    }
                },
                {
                    type: "default_reflection",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Gratias tibi ago pro colloquio! Fuit mihi iucundum.",
                        english: "Thank you for the conversation! It was pleasant for me."
                    }
                }
            ],
            suggestions: [
                { latin: "Placuit mihi!", english: "I enjoyed it!" },
                { latin: "Multum disco", english: "I learned a lot" },
                { latin: "Gratias tibi ago", english: "Thank you" }
            ],
            nextStep: 10
        },

        // ===== STEP 10: WARM FAREWELL =====
        {
            id: 10,
            question: {
                latin: "Vale, {name}! Tempus fugit, sed memoria manet. Spero te cras iterum visurum!",
                english: "Farewell, {name}! Time flies, but memory remains. I hope to see you again tomorrow!"
            },
            responses: [
                {
                    type: "farewell",
                    pattern: /(.+)/,
                    acknowledgment: {
                        latin: "Vale et bene tibi eveniat! Expectabo te cras, amice!",
                        english: "Farewell and may good things happen to you! I'll expect you tomorrow, friend!"
                    }
                }
            ],
            suggestions: [
                { latin: "Vale, Livia!", english: "Farewell, Livia!" },
                { latin: "Gratias!", english: "Thanks!" },
                { latin: "Cras revertar!", english: "I'll return tomorrow!" }
            ],
            nextStep: 0
        }
    ],

    // SIMPLE RESPONSE HANDLER - Livia acknowledges and moves forward
    getResponse(userMessage, currentContext) {
        const message = userMessage.toLowerCase().trim();
        const currentStep = this.conversationSteps[this.currentStep];
        
        // Extract name if in first step
        if (this.currentStep === 0 && !currentContext.userName) {
            const nameMatch = message.match(/([A-Za-z]{2,})/);
            if (nameMatch && nameMatch[1]) {
                currentContext.userName = nameMatch[1];
            }
        }

        // Find matching response
        let selectedResponse = currentStep.responses.find(response => 
            message.match(response.pattern)
        ) || currentStep.responses[0];

        // Move to next step
        this.currentStep = currentStep.nextStep;

        // Personalize acknowledgment
        let acknowledgment = { ...selectedResponse.acknowledgment };
        if (currentContext.userName) {
            acknowledgment.latin = acknowledgment.latin.replace(/{name}/g, currentContext.userName);
            acknowledgment.english = acknowledgment.english.replace(/{name}/g, currentContext.userName);
        }

        return {
            latin: acknowledgment.latin,
            english: acknowledgment.english,
            suggestions: this.conversationSteps[this.currentStep]?.suggestions || []
        };
    },

    // Get current question for display
    getCurrentQuestion(currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
        let question = { ...currentStep.question };
        
        if (currentContext.userName) {
            question.latin = question.latin.replace(/{name}/g, currentContext.userName);
            question.english = question.english.replace(/{name}/g, currentContext.userName);
        }
        
        return question;
    },

    // Get suggestions for current step
    getCurrentSuggestions() {
        return this.conversationSteps[this.currentStep]?.suggestions || [];
    },

    resetConversation() {
        this.currentStep = 0;
        return {
            userName: null,
            knowsName: false
        };
    }
};

// Initialize suggestions
const suggestedResponsesData = conversationSystem.getCurrentSuggestions();
