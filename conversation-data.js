// conversation-data.js - STRUCTURED CONVERSATION FLOW
// Easy to enrich: Just add more steps to conversationSteps array

const conversationSystem = {
    currentStep: 0,
    userName: null,
    
    // CLEAR STRUCTURE: Each step has a question, answers, and next steps
    conversationSteps: [
        // ===== STEP 1: WARM GREETING =====
        {
            id: 1,
            question: {
                latin: "Salve! Ego Livia Valeria sum. Quid nomen tibi est?",
                english: "Hello! I am Livia Valeria. What is your name?"
            },
            answers: [
                {
                    type: "name_provided",
                    pattern: /([A-Za-z]{2,})/,
                    response: {
                        latin: "Salve {name}! Nomen dulce est. Gaudeo te cognoscere!",
                        english: "Hello {name}! That's a sweet name. Pleased to meet you!"
                    },
                    nextStep: 2
                },
                {
                    type: "no_name",
                    pattern: /(nescio|don't know|not sure)/i,
                    response: {
                        latin: "Nullum problema! Potes mihi nomen tuum dicere cum voles.",
                        english: "No problem! You can tell me your name whenever you want."
                    },
                    nextStep: 2
                }
            ],
            suggestions: [
                { latin: "Mihi nomen Tim est", english: "My name is Tim" },
                { latin: "Maria", english: "Just say your name" },
                { latin: "Nescio", english: "I don't know" }
            ]
        },

        // ===== STEP 2: ORIGIN STORY =====
        {
            id: 2,
            question: {
                latin: "Unde in mundo venis?",
                english: "Where in the world do you come from?"
            },
            answers: [
                {
                    type: "from_america",
                    pattern: /(america|united states|us|usa|canada)/i,
                    response: {
                        latin: "Terra trans oceanum! Audivi terras illas esse ingentes.",
                        english: "Lands across the ocean! I've heard those lands are vast."
                    },
                    nextStep: 3
                },
                {
                    type: "from_europe",
                    pattern: /(europe|germany|france|spain|britain|italy)/i,
                    response: {
                        latin: "Provinciae Romanae! Estne vita ibi similis vitae Romanae?",
                        english: "Roman provinces! Is life there similar to Roman life?"
                    },
                    nextStep: 3
                },
                {
                    type: "from_rome",
                    pattern: /(rome|italia|roman)/i,
                    response: {
                        latin: "Tu es Romanus? Optime! Ego in villa prope Romam habito.",
                        english: "You're Roman? Excellent! I live in a villa near Rome."
                    },
                    nextStep: 3
                },
                {
                    type: "default_origin",
                    pattern: /.*/,
                    response: {
                        latin: "Locus interesting! Narra mihi plus de patria tua.",
                        english: "Interesting place! Tell me more about your country."
                    },
                    nextStep: 3
                }
            ],
            suggestions: [
                { latin: "Ex America sum", english: "I'm from America" },
                { latin: "Ex Europa venio", english: "I come from Europe" },
                { latin: "Romanus sum", english: "I'm Roman" }
            ]
        },

        // ===== STEP 3: CURRENT FEELING =====
        {
            id: 3,
            question: {
                latin: "Quomodo te hodie habes?",
                english: "How are you feeling today?"
            },
            answers: [
                {
                    type: "feeling_good",
                    pattern: /(good|well|fine|bene|happy|great)/i,
                    response: {
                        latin: "Gaudeo te bene valere! Hodie in horto meo rosas colui.",
                        english: "I'm glad you're well! Today I cultivated roses in my garden."
                    },
                    nextStep: 4
                },
                {
                    type: "feeling_tired",
                    pattern: /(tired|fatigatus|sleepy|exhausted)/i,
                    response: {
                        latin: "Me paenitet. Saepe me adiuvat ambulatio in horto.",
                        english: "I'm sorry. Walking in the garden often helps me."
                    },
                    nextStep: 4
                },
                {
                    type: "feeling_curious",
                    pattern: /(curious|interested|curiosus)/i,
                    response: {
                        latin: "Curiositas signum animi viventis est!",
                        english: "Curiosity is a sign of a living soul!"
                    },
                    nextStep: 4
                },
                {
                    type: "default_feeling",
                    pattern: /.*/,
                    response: {
                        latin: "Intellegeo. Vita habet dies bonos et malos.",
                        english: "I understand. Life has good days and bad days."
                    },
                    nextStep: 4
                }
            ],
            suggestions: [
                { latin: "Bene valeo!", english: "I'm doing well!" },
                { latin: "Fatigatus sum", english: "I'm tired" },
                { latin: "Curiosus sum", english: "I'm curious" }
            ]
        },

        // ===== STEP 4: ROMAN LIFE INTRODUCTION =====
        {
            id: 4,
            question: {
                latin: "Visne audire de vita cotidiana Romana?",
                english: "Would you like to hear about daily Roman life?"
            },
            answers: [
                {
                    type: "yes_roman_life",
                    pattern: /(yes|please|certe|volo|tell)/i,
                    response: {
                        latin: "Optime! In Roma, vita incipit cum sole oritur...",
                        english: "Excellent! In Rome, life begins when the sun rises..."
                    },
                    nextStep: 5
                },
                {
                    type: "no_roman_life",
                    pattern: /(no|not now|maybe later)/i,
                    response: {
                        latin: "Intellegeo. Loquamur de rebus iucundis.",
                        english: "I understand. Let's talk about pleasant things."
                    },
                    nextStep: 5
                },
                {
                    type: "default_roman",
                    pattern: /.*/,
                    response: {
                        latin: "Forsitan aliquando de Roma narrabo. Nunc, dic mihi...",
                        english: "Perhaps I'll tell you about Rome sometime. Now, tell me..."
                    },
                    nextStep: 5
                }
            ],
            suggestions: [
                { latin: "Certe! Narra mihi", english: "Certainly! Tell me" },
                { latin: "Maxime volo!", english: "I really want to!" },
                { latin: "Alio tempore", english: "Another time" }
            ]
        },

        // ===== STEP 5: DAILY ACTIVITIES =====
        {
            id: 5,
            question: {
                latin: "Quid facis in vita cotidiana?",
                english: "What do you do in your daily life?"
            },
            answers: [
                {
                    type: "work",
                    pattern: /(work|labor|job|officium)/i,
                    response: {
                        latin: "Labor omnia vincit! Ego quoque epistulas scribo et hortum colo.",
                        english: "Work conquers all! I also write letters and cultivate the garden."
                    },
                    nextStep: 6
                },
                {
                    type: "study",
                    pattern: /(school|schola|study|disco|learn)/i,
                    response: {
                        latin: "Discere semper bonum est! Ego libros Graecos lego.",
                        english: "Learning is always good! I read Greek books."
                    },
                    nextStep: 6
                },
                {
                    type: "hobbies",
                    pattern: /(read|books|music|sports|hobbies)/i,
                    response: {
                        latin: "Hobbies animum recreant! Ego citharam tangere disco.",
                        english: "Hobbies refresh the soul! I'm learning to play the lyre."
                    },
                    nextStep: 6
                },
                {
                    type: "default_activities",
                    pattern: /.*/,
                    response: {
                        latin: "Omnes habemus occupationes diversas. Hoc est bonum!",
                        english: "We all have different occupations. This is good!"
                    },
                    nextStep: 6
                }
            ],
            suggestions: [
                { latin: "Laboro", english: "I work" },
                { latin: "In schola disco", english: "I study in school" },
                { latin: "Libros lego", english: "I read books" }
            ]
        },

        // ===== STEP 6: ROMAN CULTURE DEEP DIVE =====
        {
            id: 6,
            question: {
                latin: "Quae pars culturae Romanae te maxime delectat?",
                english: "Which part of Roman culture interests you most?"
            },
            answers: [
                {
                    type: "gladiators",
                    pattern: /(gladiators|colosseum|games|ludi)/i,
                    response: {
                        latin: "Gladiatores fortiter pugnant! Populus in Colosseo exultat!",
                        english: "Gladiators fight bravely! The people cheer in the Colosseum!"
                    },
                    nextStep: 7
                },
                {
                    type: "gods",
                    pattern: /(gods|deos|religion|minos)/i,
                    response: {
                        latin: "Romani multos deos colunt. Ego Minervam, deam sapientiae, adoro.",
                        english: "Romans worship many gods. I worship Minerva, goddess of wisdom."
                    },
                    nextStep: 7
                },
                {
                    type: "architecture",
                    pattern: /(buildings|architecture|temples|thermae)/i,
                    response: {
                        latin: "Architectura Romana magnifica est! Aquaeductus, viae, templa...",
                        english: "Roman architecture is magnificent! Aqueducts, roads, temples..."
                    },
                    nextStep: 7
                },
                {
                    type: "default_culture",
                    pattern: /.*/,
                    response: {
                        latin: "Cultura Romana multas habet mirabiles partes.",
                        english: "Roman culture has many wonderful aspects."
                    },
                    nextStep: 7
                }
            ],
            suggestions: [
                { latin: "Gladiatores", english: "Gladiators" },
                { latin: "Dei Romani", english: "Roman gods" },
                { latin: "Architectura", english: "Architecture" }
            ]
        },

        // ===== STEP 7: PERSONAL PHILOSOPHY =====
        {
            id: 7,
            question: {
                latin: "Seneca dicit: 'Non scholae sed vitae discimus.' Credisne hoc?",
                english: "Seneca says: 'We learn not for school but for life.' Do you believe this?"
            },
            answers: [
                {
                    type: "agree",
                    pattern: /(yes|certe|true|verum|agree)/i,
                    response: {
                        latin: "Sapienter dicis! Vita ipsa est magister optimus.",
                        english: "You speak wisely! Life itself is the best teacher."
                    },
                    nextStep: 8
                },
                {
                    type: "disagree",
                    pattern: /(no|non|not really|disagree)/i,
                    response: {
                        latin: "Interessant! Forsitan schola et vita ambo importantes sunt.",
                        english: "Interesting! Perhaps school and life are both important."
                    },
                    nextStep: 8
                },
                {
                    type: "unsure",
                    pattern: /(nescio|don't know|not sure)/i,
                    response: {
                        latin: "Haec quaestio profunda est. Tempore discimus veritatem.",
                        english: "This question is deep. With time we learn the truth."
                    },
                    nextStep: 8
                },
                {
                    type: "default_philosophy",
                    pattern: /.*/,
                    response: {
                        latin: "Philosophia nos cogitare facit. Hoc bonum est!",
                        english: "Philosophy makes us think. This is good!"
                    },
                    nextStep: 8
                }
            ],
            suggestions: [
                { latin: "Certe verum est!", english: "Certainly true!" },
                { latin: "Non credo", english: "I don't believe so" },
                { latin: "Nescio", english: "I don't know" }
            ]
        },

        // ===== STEP 8: GARDEN & NATURE =====
        {
            id: 8,
            question: {
                latin: "In horto meo multae res crescunt. Amasne plantas et flores?",
                english: "Many things grow in my garden. Do you like plants and flowers?"
            },
            answers: [
                {
                    type: "love_nature",
                    pattern: /(yes|love|amo|like|placet)/i,
                    response: {
                        latin: "Gaudeo! Rosae rubrae et lilium candidum in horto meo crescunt.",
                        english: "I'm glad! Red roses and white lilies grow in my garden."
                    },
                    nextStep: 9
                },
                {
                    type: "indifferent_nature",
                    pattern: /(no|not really|non|indifferent)/i,
                    response: {
                        latin: "Intellegeo. Non omnes eadem amant. Fortasse alia te delectant?",
                        english: "I understand. Not everyone loves the same things."
                    },
                    nextStep: 9
                },
                {
                    type: "default_nature",
                    pattern: /.*/,
                    response: {
                        latin: "Natura semper mirabilia offert. Saepe in horto meditor.",
                        english: "Nature always offers wonders. I often meditate in the garden."
                    },
                    nextStep: 9
                }
            ],
            suggestions: [
                { latin: "Maxime amo!", english: "I love them very much!" },
                { latin: "Non multum curo", english: "I don't care much" },
                { latin: "Habeo hortum", english: "I have a garden" }
            ]
        },

        // ===== STEP 9: FINAL REFLECTION =====
        {
            id: 9,
            question: {
                latin: "Colloquium nostrum finire debemus. Habesne ultimam quaestionem?",
                english: "We must end our conversation. Do you have a final question?"
            },
            answers: [
                {
                    type: "question_about_rome",
                    pattern: /(rome|roma|roman|life|vita)/i,
                    response: {
                        latin: "Bona quaestio! Roma semper in corde meo manet. Spero te visitare!",
                        english: "Good question! Rome always remains in my heart. I hope you visit!"
                    },
                    nextStep: 10
                },
                {
                    type: "question_about_livia",
                    pattern: /(you|tua|your|life|vita)/i,
                    response: {
                        latin: "Gratias! Ego felix sum in villa mea cum familia. Vita bona est!",
                        english: "Thank you! I am happy in my villa with family. Life is good!"
                    },
                    nextStep: 10
                },
                {
                    type: "no_question",
                    pattern: /(no|non|nothing|nihil)/i,
                    response: {
                        latin: "Nullum problema! Fuit mihi iucundum tecum colloqui!",
                        english: "No problem! It was pleasant to speak with you!"
                    },
                    nextStep: 10
                },
                {
                    type: "default_final",
                    pattern: /.*/,
                    response: {
                        latin: "Gratias tibi ago pro colloquio! Spero te iterum visurum!",
                        english: "Thank you for the conversation! I hope to see you again!"
                    },
                    nextStep: 10
                }
            ],
            suggestions: [
                { latin: "De Roma", english: "About Rome" },
                { latin: "De vita tua", english: "About your life" },
                { latin: "Nihil", english: "Nothing" }
            ]
        },

        // ===== STEP 10: WARM FAREWELL =====
        {
            id: 10,
            question: {
                latin: "Vale, amice! Memoria nostri colloquii semper mecum manebit. Cras revertare!",
                english: "Farewell, friend! The memory of our conversation will stay with me. Return tomorrow!"
            },
            answers: [
                {
                    type: "farewell",
                    pattern: /.*/,
                    response: {
                        latin: "Vale et bene tibi eveniat! Expectabo te cras!",
                        english: "Farewell and may good things happen to you! I'll expect you tomorrow!"
                    },
                    nextStep: 0 // Reset for next conversation
                }
            ],
            suggestions: [
                { latin: "Vale, Livia!", english: "Farewell, Livia!" },
                { latin: "Gratias tibi ago!", english: "Thank you!" },
                { latin: "Cras revertar!", english: "I'll return tomorrow!" }
            ]
        }
    ],

    // SIMPLE RESPONSE HANDLER - Easy to understand and modify
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

        // Find matching answer
        let selectedAnswer = currentStep.answers.find(answer => 
            message.match(answer.pattern)
        ) || currentStep.answers.find(answer => 
            answer.type.includes("default")
        ) || currentStep.answers[0];

        // Move to next step
        this.currentStep = selectedAnswer.nextStep;

        // Personalize response
        let response = { ...selectedAnswer.response };
        if (currentContext.userName) {
            response.latin = response.latin.replace(/{name}/g, currentContext.userName);
            response.english = response.english.replace(/{name}/g, currentContext.userName);
        }

        return {
            latin: response.latin,
            english: response.english,
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
