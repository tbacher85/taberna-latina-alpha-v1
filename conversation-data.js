// conversation-data.js - FIXED BUBBLE DISPLAY
// Proper name extraction + Always show relevant bubbles

const conversationSystem = {
    currentStep: 0,
    userName: null,
    
    // SCRIPTED CONVERSATION WITH PROPER BUBBLE HANDLING
    conversationSteps: [
        // ===== STEP 1: WELCOME & NAME =====
        {
            id: 1,
            livia: {
                latin: "Salve! Ego Livia Valeria sum, patricia Romana. Quid nomen tibi est?",
                english: "Hello! I am Livia Valeria, a Roman noblewoman. What is your name?"
            },
            userOptions: [
                { 
                    latin: "Mihi nomen est...", 
                    english: "My name is...",
                    nextStep: 2,
                    isNamePrompt: true
                },
                { 
                    latin: "Nomen mihi est...", 
                    english: "My name is...", 
                    nextStep: 2,
                    isNamePrompt: true
                }
            ]
        },

        // ===== STEP 2: WELCOME RESPONSE =====
        {
            id: 2,
            livia: {
                latin: "Salve {name}! Nomen tuum mihi placet. Gaudeo te cognoscere! Visne mecum colloqui de vita Romana?",
                english: "Hello {name}! I like your name. Pleased to meet you! Would you like to chat with me about Roman life?"
            },
            userOptions: [
                { 
                    latin: "Certe! Volo discere de Roma", 
                    english: "Certainly! I want to learn about Rome",
                    nextStep: 3
                },
                { 
                    latin: "Maxime volo audire!", 
                    english: "I really want to hear!",
                    nextStep: 3
                },
                { 
                    latin: "Ita, quaeso narra", 
                    english: "Yes, please tell",
                    nextStep: 3
                }
            ]
        },

        // ===== STEP 3: DAILY ROMAN LIFE =====
        {
            id: 3,
            livia: {
                latin: "Optime! In Roma, vita incipit cum sole. Mane cibum sumimus, deinde aut in forum aut in thermas imus. Quid vis primum audire, {name}?",
                english: "Excellent! In Rome, life begins with the sun. In the morning we eat, then we go either to the forum or to the baths. What would you like to hear first, {name}?"
            },
            userOptions: [
                { 
                    latin: "De foro Romano narra", 
                    english: "Tell me about the Roman Forum",
                    nextStep: 4  // This now correctly goes to Forum
                },
                { 
                    latin: "De thermis quaeso", 
                    english: "About the baths, please",
                    nextStep: 5  // This now correctly goes to Baths
                },
                { 
                    latin: "De cena Romana disco", 
                    english: "I want to learn about Roman dinner",
                    nextStep: 6  // This now correctly goes to Dinner
                }
            ]
        },

        // ===== STEP 4: ROMAN FORUM =====
        {
            id: 4,
            livia: {
                latin: "Forum Romanum cor urbis est! Ibi mercatores vendunt, senatores disputant, et amici colloquuntur. Omnia ibi fiunt! Visne plus audire de mercatoribus an de senatoribus, {name}?",
                english: "The Roman Forum is the heart of the city! There merchants sell, senators debate, and friends chat. Everything happens there! Would you like to hear more about merchants or senators, {name}?"
            },
            userOptions: [
                { 
                    latin: "De mercatoribus audire volo", 
                    english: "I want to hear about merchants",
                    nextStep: 7
                },
                { 
                    latin: "De senatoribus quaeso", 
                    english: "About senators, please",
                    nextStep: 8
                },
                { 
                    latin: "De amicis in foro", 
                    english: "About friends in the forum",
                    nextStep: 9
                }
            ]
        },

        // ===== STEP 5: ROMAN BATHS =====
        {
            id: 5,
            livia: {
                latin: "Thermae non solum ad lavandum sunt! Ibi socializamus, negotia agimus, et relaxamus. Aqua calida et frigida, unctores qui nos ungunt... estne interesting, {name}?",
                english: "The baths are not just for washing! There we socialize, do business, and relax. Hot and cold water, ointment-rubbers who massage us... is it interesting, {name}?"
            },
            userOptions: [
                { 
                    latin: "Valde interesting est!", 
                    english: "It's very interesting!",
                    nextStep: 10
                },
                { 
                    latin: "Narra plus de thermis", 
                    english: "Tell me more about the baths",
                    nextStep: 10
                },
                { 
                    latin: "De socializatione disco", 
                    english: "I want to learn about socialization",
                    nextStep: 10
                }
            ]
        },

        // ===== STEP 6: ROMAN DINNER =====
        {
            id: 6,
            livia: {
                latin: "Cena Romana tempus sociale est! Pultem, carnes, pisces, et multas legumes edimus. Cum amicus recumbimus et diu colloquimur. Amasne cenare cum amicis, {name}?",
                english: "Roman dinner is social time! We eat porridge, meats, fish, and many vegetables. We recline with friends and chat for a long time. Do you like dining with friends, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ita, cenam cum amicis amo", 
                    english: "Yes, I love dining with friends",
                    nextStep: 11
                },
                { 
                    latin: "Aliquando ceno cum amicis", 
                    english: "Sometimes I dine with friends",
                    nextStep: 11
                },
                { 
                    latin: "Non saepe ceno cum amicis", 
                    english: "I don't often dine with friends",
                    nextStep: 11
                }
            ]
        },

        // ===== STEP 7: MERCHANTS =====
        {
            id: 7,
            livia: {
                latin: "Mercatores omnia vendunt! Olivas ex Hispania, serica ex Sinarum, aromata ex India... Roma totum mundum adit. Nonne mirabile est, {name}?",
                english: "Merchants sell everything! Olives from Spain, silk from China, spices from India... Rome reaches the whole world. Isn't it wonderful, {name}?"
            },
            userOptions: [
                { 
                    latin: "Mirabile est!", 
                    english: "It's wonderful!",
                    nextStep: 12
                },
                { 
                    latin: "Roma valde potens est", 
                    english: "Rome is very powerful",
                    nextStep: 12
                },
                { 
                    latin: "De mercatoribus plus disco", 
                    english: "I want to learn more about merchants",
                    nextStep: 12
                }
            ]
        },

        // ===== STEP 8: SENATORS =====
        {
            id: 8,
            livia: {
                latin: "Senatores de republica disputant! In Curia, leges creant et de bello paceque decernunt. Potestas magna est in eorum manibus. Visne scire quomodo hoc fit, {name}?",
                english: "Senators debate about the republic! In the Senate House, they create laws and decide about war and peace. Great power is in their hands. Do you want to know how this happens, {name}?"
            },
            userOptions: [
                { 
                    latin: "Certe scire volo", 
                    english: "Certainly I want to know",
                    nextStep: 13
                },
                { 
                    latin: "Est valde interesting", 
                    english: "It's very interesting",
                    nextStep: 13
                },
                { 
                    latin: "De aliis rebus narra", 
                    english: "Tell me about other things",
                    nextStep: 14
                }
            ]
        },

        // ===== STEP 9: FRIENDS IN FORUM =====
        {
            id: 9,
            livia: {
                latin: "In foro cum amicis colloquor! De vita, de philosophia, de poetis... tempus felix est. Habesne amicos cum quibus de profundis rebus loqueris, {name}?",
                english: "In the forum I chat with friends! About life, philosophy, poets... it's happy time. Do you have friends with whom you talk about deep things, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ita, amicos habeo", 
                    english: "Yes, I have friends",
                    nextStep: 15
                },
                { 
                    latin: "Non multos amicos habeo", 
                    english: "I don't have many friends",
                    nextStep: 15
                },
                { 
                    latin: "Aliquando cum amicis loquor", 
                    english: "Sometimes I talk with friends",
                    nextStep: 15
                }
            ]
        },

        // ===== STEP 10: BATH SOCIAL LIFE =====
        {
            id: 10,
            livia: {
                latin: "In thermis, omnes classes sociales conveniunt! Pauperes et divites, servii et liberi... aqua omnes aequat. Hoc democratiam Romanam repraesentat, nonne, {name}?",
                english: "In the baths, all social classes meet! Poor and rich, slaves and free... water makes everyone equal. This represents Roman democracy, doesn't it, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ita, certe repraesentat!", 
                    english: "Yes, it certainly represents it!",
                    nextStep: 16
                },
                { 
                    latin: "Idea interesting est", 
                    english: "The idea is interesting",
                    nextStep: 16
                },
                { 
                    latin: "Non cogitaveram de hoc", 
                    english: "I hadn't thought about this",
                    nextStep: 16
                }
            ]
        }
    ],

    // IMPROVED RESPONSE HANDLER WITH BUBBLE UPDATES
    getResponse(userMessage, currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
        
        console.log("Current step:", this.currentStep, "User message:", userMessage);
        
        // NAME EXTRACTION: Multiple patterns to catch the user's name
        if (this.currentStep === 0 && !currentContext.userName) {
            const namePatterns = [
                /mihi nomen (est )?([A-Za-z]+)/i,
                /nomen mihi est ([A-Za-z]+)/i,
                /ego sum ([A-Za-z]+)/i,
                /my name is ([A-Za-z]+)/i,
                /I am ([A-Za-z]+)/i,
                /^([A-Za-z]{2,})$/i  // Just the name itself
            ];
            
            for (const pattern of namePatterns) {
                const match = userMessage.match(pattern);
                if (match) {
                    // Get the name from the appropriate capture group
                    const name = match[2] || match[1];
                    if (name) {
                        currentContext.userName = name;
                        console.log("Name extracted:", currentContext.userName);
                        break;
                    }
                }
            }
        }

        // Find the selected option - IMPROVED MATCHING
        let selectedOption = currentStep.userOptions[0]; // Default to first option
        
        for (const option of currentStep.userOptions) {
            // Clean the option texts for comparison
            const cleanLatin = option.latin.replace(/\.\.\./g, '').trim().toLowerCase();
            const cleanEnglish = option.english.replace(/\.\.\./g, '').trim().toLowerCase();
            const userMessageLower = userMessage.toLowerCase();
            
            // Check if user message contains the option text (either language)
            if (userMessageLower.includes(cleanLatin) || 
                userMessageLower.includes(cleanEnglish) ||
                (option.isNamePrompt && userMessageLower.length > 1)) {
                selectedOption = option;
                break;
            }
        }

        // Move to next step
        this.currentStep = selectedOption.nextStep - 1; // Subtract 1 because steps are 1-indexed in the array
        const nextStep = this.conversationSteps[this.currentStep];

        if (!nextStep) {
            console.error("No next step found for:", selectedOption.nextStep);
            return {
                latin: "Error: No next conversation step found.",
                english: "Error: No next conversation step found.",
                suggestions: []
            };
        }

        // Personalize Livia's message
        let liviaMessage = { ...nextStep.livia };
        if (currentContext.userName) {
            liviaMessage.latin = liviaMessage.latin.replace(/{name}/g, currentContext.userName);
            liviaMessage.english = liviaMessage.english.replace(/{name}/g, currentContext.userName);
        }

        // Prepare suggestions for next step
        const nextSuggestions = nextStep.userOptions.map(opt => ({
            latin: currentContext.userName ? 
                opt.latin.replace(/{name}/g, currentContext.userName) : 
                opt.latin,
            english: currentContext.userName ? 
                opt.english.replace(/{name}/g, currentContext.userName) : 
                opt.english
        }));

        console.log("Next step:", this.currentStep, "Suggestions:", nextSuggestions);

        return {
            latin: liviaMessage.latin,
            english: liviaMessage.english,
            suggestions: nextSuggestions
        };
    },

    // Get current question for display
    getCurrentQuestion(currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
        if (!currentStep) return { latin: "Error", english: "Error" };
        
        let question = { ...currentStep.livia };
        
        if (currentContext.userName) {
            question.latin = question.latin.replace(/{name}/g, currentContext.userName);
            question.english = question.english.replace(/{name}/g, currentContext.userName);
        }
        
        return question;
    },

    // Get suggestions for current step
    getCurrentSuggestions(currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
        if (!currentStep || !currentStep.userOptions) return [];
        
        return currentStep.userOptions.map(opt => ({
            latin: currentContext.userName ? 
                opt.latin.replace(/{name}/g, currentContext.userName) : 
                opt.latin,
            english: currentContext.userName ? 
                opt.english.replace(/{name}/g, currentContext.userName) : 
                opt.english,
            isNamePrompt: opt.isNamePrompt || false
        }));
    },

    resetConversation() {
        this.currentStep = 0;
        return {
            userName: null,
            knowsName: false
        };
    }
};

// Initialize with empty suggestions - they will be updated when conversation starts
const suggestedResponsesData = [];
