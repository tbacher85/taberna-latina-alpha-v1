// conversation-data.js - FIXED BUBBLE DISPLAY & EXTENDED CONVERSATION
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
                    latin: "Type your name above...", 
                    english: "Type your name above...",
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
                latin: "Thermae non solum ad lavandum sunt! Ibi colloquimur, negotia agimus, et relaxamus. Aqua calida et frigida, unctores qui nos ungunt... Estne iucundum, {name}?",
                english: "The baths are not only for washing! There we converse, we transact business, and we relax. Hot and cold water, attendants who rub us down... Is it pleasant/interesting, {name}?"
            },
            userOptions: [
                { 
                    latin: "Valde iucundum est!", 
                    english: "It is very pleasant/delightful!",
                    nextStep: 10
                },
                { 
                    latin: "Narra plus de thermis", 
                    english: "Tell me more about the baths",
                    nextStep: 10
                },
                { 
                    latin: "De colloquio disco?", 
                    english: "I want to learn about conversation/discussion?",
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
        },

        // ===== STEP 11: DINNER SOCIAL =====
        {
            id: 11,
            livia: {
                latin: "Cum amicis cenare est optimus modus ad colloquium! In triclinio recumbimus, cibum bonum sumimus, et de omni re colloquimur. Quid edĕre cum amicis maxime amas, {name}?",
                english: "To dine with friends is the best way for conversation! We recline in the dining room, we eat good food, and we converse about everything. What do you most love to eat with friends, {name}?"
            },
            userOptions: [
                { 
                    latin: "Cibum bonum amo", 
                    english: "I love the good food",
                    nextStep: 17
                },
                { 
                    latin: "Colloquium cum amicis", 
                    english: "The conversation with friends",
                    nextStep: 17
                },
                { 
                    latin: "Iūcunditas Convivii", 
                    english: "The Pleasantness/Enjoyment of the Dinner Party",
                    nextStep: 17
                }
            ]
        },

        // ===== STEP 12: ROMAN TRADE =====
        {
            id: 12,
            livia: {
                latin: "Mercatores Romani ad omnes mundi partes navigant! Ex Aegypto frumentum, ex Africa bestias, ex Germania sucum. Roma sine mercatoribus non esset tam dives. Visne scire quomodo navigant, {name}?",
                english: "Roman merchants sail to all parts of the world! From Egypt grain, from Africa beasts, from Germany amber. Rome would not be so rich without merchants. Do you want to know how they sail, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ita, de navigatione disco", 
                    english: "Yes, I want to learn about sailing",
                    nextStep: 18
                },
                { 
                    latin: "De aliis mercibus narra", 
                    english: "Tell me about other goods",
                    nextStep: 18
                },
                { 
                    latin: "De periculis navigationis", 
                    english: "About the dangers of sailing",
                    nextStep: 18
                }
            ]
        },

        // ===== STEP 13: SENATE PROCESS =====
        {
            id: 13,
            livia: {
                latin: "In senatu, senatores togam praetextam gerunt. Disputationes longae sunt, sed necessariae. Princeps senatus ordinat omnia. Estne simile huic systemati in tua patria, {name}?",
                english: "In the senate, senators wear the toga praetexta. The debates are long, but necessary. The princeps senatus organizes everything. Is it similar to this system in your country, {name}?"
            },
            userOptions: [
                { 
                    latin: "Aliquantum simile est", 
                    english: "It is somewhat similar",
                    nextStep: 19
                },
                { 
                    latin: "Valde diversum est", 
                    english: "It is very different",
                    nextStep: 19
                },
                { 
                    latin: "Nescio systema meum", 
                    english: "I don't know my system",
                    nextStep: 19
                }
            ]
        },

        // ===== STEP 14: OTHER TOPICS =====
        {
            id: 14,
            livia: {
                latin: "De aliis rebus? Certē! In Roma multa iucunda sunt: ludi gladiatorii, theatrum, poëtae, philosophi... Quid vis audire, {name}?",
                english: "About other things? Certainly! In Rome there are many delightful/pleasant things: gladiatorial games, theater, poets, philosophers... What do you want to hear, {name}?"
            },
            userOptions: [
                { 
                    latin: "De ludis gladiatoriis", 
                    english: "About gladiator games",
                    nextStep: 20
                },
                { 
                    latin: "De theatro Romano", 
                    english: "About Roman theater",
                    nextStep: 21
                },
                { 
                    latin: "De philosophis", 
                    english: "About philosophers",
                    nextStep: 22
                }
            ]
        },

        // ===== STEP 15: FRIENDSHIP CONTINUED =====
        {
            id: 15,
            livia: {
                latin: "Amicitia Romana fundāmentum vitae bonae est. Cicero dixit: 'Amicitia nisi inter bonos esse non potest'. Quid de amicitia cogitas, {name}?",
                english: "Roman friendship is the foundation of a good life. Cicero said: 'Friendship cannot exist except among good people'. What do you think about friendship, {name}?"
            },
            userOptions: [
                { 
                    latin: "Amicitia mihi maximi est", 
                    english: "Friendship is very important to me",
                    nextStep: 23
                },
                { 
                    latin: "Amici sunt familia electa", 
                    english: "Friends are chosen family",
                    nextStep: 23
                },
                { 
                    latin: "Difficile est amicos veros invenire", 
                    english: "It's hard to find true friends",
                    nextStep: 23
                }
            ]
        },

        // ===== STEP 16: BATH CULTURE CONTINUED =====
        {
            id: 16,
            livia: {
                latin: "In thermis non solum lavamus, sed etiam exercemus! In palaestra ludimus pilā, currimus, et luctamur. Postea in calidario et frigidario lavamus. Visne plus de exercitiis Romānis audire, {name}?",
                english: "In the baths we not only wash, but also exercise! In the palaestra we play ball, run, and wrestle. Afterwards we wash in the hot and cold rooms. Do you want to hear more about Roman exercises, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ita, de exercitiis disco", 
                    english: "Yes, I want to learn about exercises",
                    nextStep: 24
                },
                { 
                    latin: "De architectura thermarum", 
                    english: "About the bath architecture",
                    nextStep: 24
                },
                { 
                    latin: "Satis de thermis audivi", 
                    english: "I've heard enough about baths",
                    nextStep: 14
                }
            ]
        },

        // ===== STEP 17-24: CONTINUED CONVERSATION PATHS =====
        {
            id: 17,
            livia: {
                latin: "Cena cum amicis est vera voluptas! Nos Romani multas horas cenamus - interdum tota nocte! Poëtae recitant, musici canunt... Estne simile in tua cultura, {name}?",
                english: "Dinner with friends is true pleasure! We Romans dine for many hours - sometimes all night! Poets recite, musicians sing... Is it similar in your culture, {name}?"
            },
            userOptions: [
                { 
                    latin: "Simile est", 
                    english: "It is similar",
                    nextStep: 25
                },
                { 
                    latin: "Aliquantum diversum", 
                    english: "Somewhat different",
                    nextStep: 25
                },
                { 
                    latin: "Narra plus de cenis Romanis", 
                    english: "Tell me more about Roman dinners",
                    nextStep: 25
                }
            ]
        },

        // Add more steps here to continue the conversation...
        // For now, let's create a graceful ending point
        {
            id: 25,
            livia: {
                latin: "Gratias tibi ago, {name}, pro hoc colloquio iucundo! Spero te aliquid novi de Roma antiqua discere. Semper bene vale et, si vis, iterum me visita!",
                english: "Thank you, {name}, for this pleasant conversation! I hope you learned something new about ancient Rome. Farewell always, and if you wish, visit me again!"
            },
            userOptions: [
                { 
                    latin: "Gratias tibi! Valē!", 
                    english: "Thank you! Goodbye!",
                    nextStep: 0,
                    isRestart: true
                }
            ]
        }
    ],

    // IMPROVED RESPONSE HANDLER WITH BUBBLE UPDATES
    getResponse(userMessage, currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
        
        console.log("Current step:", this.currentStep, "User message:", userMessage);
        
        // SPECIAL HANDLING FOR NAME INPUT
        if (this.currentStep === 0 && !currentContext.userName) {
            // For step 0, any reasonable text is treated as a name
            if (userMessage.trim().length > 1 && 
                !userMessage.toLowerCase().includes("type your name") &&
                !userMessage.toLowerCase().includes("...")) {
                
                // Simple name extraction - take the first word or the whole message
                const nameMatch = userMessage.match(/^([A-Za-z]{2,})/);
                if (nameMatch) {
                    currentContext.userName = nameMatch[1];
                    console.log("Name extracted:", currentContext.userName);
                } else {
                    // If no clear name, use first 10 characters
                    currentContext.userName = userMessage.substring(0, 10).trim();
                }
            }
        }

        // Find the selected option - IMPROVED MATCHING
        let selectedOption = currentStep.userOptions[0]; // Default to first option
        
        for (const option of currentStep.userOptions) {
            // Skip name prompt options for matching
            if (option.isNamePrompt) continue;
            
            // Clean the option texts for comparison
            const cleanLatin = option.latin.replace(/\.\.\./g, '').trim().toLowerCase();
            const cleanEnglish = option.english.replace(/\.\.\./g, '').trim().toLowerCase();
            const userMessageLower = userMessage.toLowerCase();
            
            // Check if user message contains the option text (either language)
            if (userMessageLower.includes(cleanLatin) || 
                userMessageLower.includes(cleanEnglish)) {
                selectedOption = option;
                break;
            }
        }

        // Handle restart option
        if (selectedOption.isRestart) {
            this.currentStep = 0;
            currentContext.userName = null;
        } else {
            // Move to next step (subtract 1 because steps are 1-indexed in the array)
            this.currentStep = selectedOption.nextStep - 1;
        }
        
        const nextStep = this.conversationSteps[this.currentStep];

        if (!nextStep) {
            console.error("No next step found for:", selectedOption.nextStep);
            // If no next step, restart conversation
            this.currentStep = 0;
            return {
                latin: "Gratias tibi ago ob hoc colloquium iucundum! Spero te aliquid novi de Roma antiqua didicisse. Semper bene vale et, si vis, iterum me visita!",
                english: "I thank you for this pleasant conversation! I hope you have learned something new about ancient Rome. Always be well (Farewell) and, if you wish, visit me again!",
                suggestions: this.conversationSteps[0].userOptions
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
                opt.english,
            isNamePrompt: opt.isNamePrompt || false,
            isRestart: opt.isRestart || false
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
            isNamePrompt: opt.isNamePrompt || false,
            isRestart: opt.isRestart || false
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
