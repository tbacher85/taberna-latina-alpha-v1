// conversation-data.js - IMPROVED SCRIPTED CONVERSATION
// Proper name extraction + Latin learning bubbles

const conversationSystem = {
    currentStep: 0,
    userName: null,
    
    // SCRIPTED CONVERSATION WITH PROPER NAME HANDLING
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
                    latin: "Mihi nomen [Nomen] est", 
                    english: "My name is [Name]",
                    nextStep: 2
                },
                { 
                    latin: "Nomen mihi est [Nomen]", 
                    english: "My name is [Name]",
                    nextStep: 2
                },
                { 
                    latin: "Ego sum [Nomen]", 
                    english: "I am [Name]",
                    nextStep: 2
                }
            ],
            isNameStep: true
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
                    nextStep: 4
                },
                { 
                    latin: "De thermis quaeso", 
                    english: "About the baths, please",
                    nextStep: 5
                },
                { 
                    latin: "De cena Romana disco", 
                    english: "I want to learn about Roman dinner",
                    nextStep: 6
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
        },

        // ===== STEP 11: FRIENDSHIP PHILOSOPHY =====
        {
            id: 11,
            livia: {
                latin: "Cicero dicit: 'Amicitia res plurimas continet.' Nihil sine amicis iucundum est. Quid sentis de amicitia, {name}?",
                english: "Cicero says: 'Friendship contains very many things.' Nothing is pleasant without friends. What do you feel about friendship, {name}?"
            },
            userOptions: [
                { 
                    latin: "Amicitia vita est", 
                    english: "Friendship is life",
                    nextStep: 17
                },
                { 
                    latin: "Amici valde importantes sunt", 
                    english: "Friends are very important",
                    nextStep: 17
                },
                { 
                    latin: "Amicitia difficilis est", 
                    english: "Friendship is difficult",
                    nextStep: 17
                }
            ]
        },

        // ===== STEP 12: ROMAN COMMERCE =====
        {
            id: 12,
            livia: {
                latin: "Mercatores narrant mirabilia! Elephantos in Africa, pyramides in Aegypto, dracones in India... Roma totum mundum novit. Visne audire de his mirabilibus, {name}?",
                english: "Merchants tell wonders! Elephants in Africa, pyramids in Egypt, dragons in India... Rome knows the whole world. Do you want to hear about these wonders, {name}?"
            },
            userOptions: [
                { 
                    latin: "Maxime audire volo!", 
                    english: "I really want to hear!",
                    nextStep: 18
                },
                { 
                    latin: "De draconibus narra", 
                    english: "Tell me about dragons",
                    nextStep: 18
                },
                { 
                    latin: "De elephantis quaeso", 
                    english: "About elephants, please",
                    nextStep: 18
                }
            ]
        },

        // ===== STEP 13: SENATE PROCESS =====
        {
            id: 13,
            livia: {
                latin: "Senatores leges creant! Primo, de re disputant; deinde, sententias ferunt; postremo, Caesari leges offerunt. Ordo et ratio in omnibus! Quid de hoc ordine sentis, {name}?",
                english: "Senators create laws! First, they debate the matter; then, they cast votes; finally, they offer laws to Caesar. Order and reason in everything! What do you feel about this order, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ordo bonus est", 
                    english: "Order is good",
                    nextStep: 19
                },
                { 
                    latin: "Sapienter ordinant", 
                    english: "They order wisely",
                    nextStep: 19
                },
                { 
                    latin: "Ordo complicatus est", 
                    english: "The order is complicated",
                    nextStep: 19
                }
            ]
        },

        // ===== STEP 14: CHANGE TOPIC =====
        {
            id: 14,
            livia: {
                latin: "Intellegeo. Non omnes politica amant. Fortasse de poetis aut de philosophia loquamur? Quid tibi placet, {name}?",
                english: "I understand. Not everyone loves politics. Perhaps we should talk about poets or philosophy? What do you like, {name}?"
            },
            userOptions: [
                { 
                    latin: "De poetis disco", 
                    english: "I want to learn about poets",
                    nextStep: 20
                },
                { 
                    latin: "De philosophia quaeso", 
                    english: "About philosophy, please",
                    nextStep: 21
                },
                { 
                    latin: "De arte Romana narra", 
                    english: "Tell me about Roman art",
                    nextStep: 22
                }
            ]
        },

        // ===== STEP 15: FRIENDSHIP DEEP =====
        {
            id: 15,
            livia: {
                latin: "Amici veri rari sunt! Ego habeo paucos amicos fideles. Cum eis de omni re loquor. In vita tua, quis est amicus verus, {name}?",
                english: "True friends are rare! I have a few faithful friends. With them I talk about everything. In your life, who is a true friend, {name}?"
            },
            userOptions: [
                { 
                    latin: "Familia mea amica est", 
                    english: "My family is my friend",
                    nextStep: 23
                },
                { 
                    latin: "Amicus antiquus verus est", 
                    english: "An old friend is true",
                    nextStep: 23
                },
                { 
                    latin: "Nondum amicum verum inveni", 
                    english: "I haven't found a true friend yet",
                    nextStep: 23
                }
            ]
        },

        // ===== STEP 16: ROMAN EQUALITY =====
        {
            id: 16,
            livia: {
                latin: "Aqua omnes aequat! In thermis, senator et servus in eadem aqua lavant. Hoc rarum est in mundo, nonne, {name}? Quid de hac aequalitate sentis?",
                english: "Water makes everyone equal! In the baths, a senator and a slave bathe in the same water. This is rare in the world, isn't it, {name}? What do you feel about this equality?"
            },
            userOptions: [
                { 
                    latin: "Pulchra idea est", 
                    english: "It's a beautiful idea",
                    nextStep: 24
                },
                { 
                    latin: "Rara in mundo est", 
                    english: "It's rare in the world",
                    nextStep: 24
                },
                { 
                    latin: "Non perfecta aequalitas est", 
                    english: "It's not perfect equality",
                    nextStep: 24
                }
            ]
        },

        // ===== STEP 17: FRIENDSHIP WISDOM =====
        {
            id: 17,
            livia: {
                latin: "Seneca dicit: 'Amicus certus in re incerta cernitur.' In difficultatibus, amici veri apparent. Experitusne es hoc in vita tua, {name}?",
                english: "Seneca says: 'A sure friend is discerned in an unsure matter.' In difficulties, true friends appear. Have you experienced this in your life, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ita, expertus sum", 
                    english: "Yes, I have experienced it",
                    nextStep: 25
                },
                { 
                    latin: "Non dum expertus sum", 
                    english: "I haven't experienced it yet",
                    nextStep: 25
                },
                { 
                    latin: "Nescio", 
                    english: "I don't know",
                    nextStep: 25
                }
            ]
        },

        // ===== STEP 18: WORLD WONDERS =====
        {
            id: 18,
            livia: {
                latin: "Mercatores narrant de Sphinge in Aegypto, de Hanging Gardens in Babylone, de Colosso Rhodi... Mundus plenus est mirabilium! Visne aliquando haec videre, {name}?",
                english: "Merchants tell about the Sphinx in Egypt, the Hanging Gardens in Babylon, the Colossus of Rhodes... The world is full of wonders! Do you want to see these someday, {name}?"
            },
            userOptions: [
                { 
                    latin: "Maxime videre cupio!", 
                    english: "I really desire to see them!",
                    nextStep: 26
                },
                { 
                    latin: "Forsitan videbo", 
                    english: "Perhaps I will see them",
                    nextStep: 26
                },
                { 
                    latin: "Difficile est videre", 
                    english: "It's difficult to see them",
                    nextStep: 26
                }
            ]
        },

        // ===== STEP 19: GOVERNMENT WISDOM =====
        {
            id: 19,
            livia: {
                latin: "Ordo et lex fundamenta societatis sunt! Sine lege, chaos regnat. In patria tua, quomodo leges creantur? Similiterne an diversimode, {name}?",
                english: "Order and law are the foundations of society! Without law, chaos reigns. In your country, how are laws created? Similarly or differently, {name}?"
            },
            userOptions: [
                { 
                    latin: "Similiter creantur", 
                    english: "They are created similarly",
                    nextStep: 27
                },
                { 
                    latin: "Diversimode creantur", 
                    english: "They are created differently",
                    nextStep: 27
                },
                { 
                    latin: "Nescio quomodo creantur", 
                    english: "I don't know how they are created",
                    nextStep: 27
                }
            ]
        },

        // ===== STEP 20: ROMAN POETS =====
        {
            id: 20,
            livia: {
                latin: "Poetae Romani magni sunt! Vergilius Aeneidem scripsit, Ovidius Metamorphoses, Horatius carmina... Quem poetam praefers, {name}?",
                english: "Roman poets are great! Virgil wrote the Aeneid, Ovid the Metamorphoses, Horace poems... Which poet do you prefer, {name}?"
            },
            userOptions: [
                { 
                    latin: "Vergilium praefero", 
                    english: "I prefer Virgil",
                    nextStep: 28
                },
                { 
                    latin: "Ovidium praefero", 
                    english: "I prefer Ovid",
                    nextStep: 28
                },
                { 
                    latin: "Horatium praefero", 
                    english: "I prefer Horace",
                    nextStep: 28
                }
            ]
        },

        // ===== STEP 21: ROMAN PHILOSOPHY =====
        {
            id: 21,
            livia: {
                latin: "Philosophia Romana practica est! Seneca, Cicero, Marcus Aurelius... omnes de vita bona docent. Quae sententia philosophica tibi placet, {name}?",
                english: "Roman philosophy is practical! Seneca, Cicero, Marcus Aurelius... all teach about the good life. Which philosophical saying do you like, {name}?"
            },
            userOptions: [
                { 
                    latin: "'Vivere est cogitare' placet", 
                    english: "I like 'To live is to think'",
                    nextStep: 29
                },
                { 
                    latin: "'Carpe diem' amo", 
                    english: "I love 'Seize the day'",
                    nextStep: 29
                },
                { 
                    latin: "'Temperantia virtus' placet", 
                    english: "I like 'Moderation is virtue'",
                    nextStep: 29
                }
            ]
        },

        // ===== STEP 22: ROMAN ART =====
        {
            id: 22,
            livia: {
                latin: "Ars Romana magnifica est! Statuae, picturae, mosaica... omnia pulchra. In villa mea, multa opera artis habeo. Amasne artem, {name}?",
                english: "Roman art is magnificent! Statues, paintings, mosaics... all beautiful. In my villa, I have many works of art. Do you love art, {name}?"
            },
            userOptions: [
                { 
                    latin: "Ita, artem amo", 
                    english: "Yes, I love art",
                    nextStep: 30
                },
                { 
                    latin: "Aliquando artem amo", 
                    english: "Sometimes I love art",
                    nextStep: 30
                },
                { 
                    latin: "Non multum artem amo", 
                    english: "I don't love art much",
                    nextStep: 30
                }
            ]
        },

        // ===== STEP 23: PERSONAL REFLECTION =====
        {
            id: 23,
            livia: {
                latin: "Amicitia donum deorum est! Spero te amicos veros invenire. Nunc, tempus fugit... Habesne ultimam quaestionem, {name}?",
                english: "Friendship is the gift of the gods! I hope you find true friends. Now, time flies... Do you have a final question, {name}?"
            },
            userOptions: [
                { 
                    latin: "De vita tua quaero", 
                    english: "I ask about your life",
                    nextStep: 31
                },
                { 
                    latin: "De futuro disco", 
                    english: "I want to learn about the future",
                    nextStep: 32
                },
                { 
                    latin: "Nil habeo quaestionum", 
                    english: "I have no questions",
                    nextStep: 33
                }
            ]
        },

        // ===== STEP 24: SOCIAL EQUALITY =====
        {
            id: 24,
            livia: {
                latin: "Aequalitas difficile est, sed necessaria! Forsitan aliquando omnes homines aequales erunt. Quid speras de futuro mundi, {name}?",
                english: "Equality is difficult, but necessary! Perhaps someday all people will be equal. What do you hope for the future of the world, {name}?"
            },
            userOptions: [
                { 
                    latin: "Pacem in mundo spero", 
                    english: "I hope for peace in the world",
                    nextStep: 34
                },
                { 
                    latin: "Aequalitatem spero", 
                    english: "I hope for equality",
                    nextStep: 34
                },
                { 
                    latin: "Nescio quid sperem", 
                    english: "I don't know what I hope",
                    nextStep: 34
                }
            ]
        },

        // ===== STEP 25: LIFE WISDOM =====
        {
            id: 25,
            livia: {
                latin: "Vita est magister optimus! Ex omni experientia discimus. Quid te docuit vita, {name}?",
                english: "Life is the best teacher! From every experience we learn. What has life taught you, {name}?"
            },
            userOptions: [
                { 
                    latin: "Patientiam docuit", 
                    english: "It taught me patience",
                    nextStep: 35
                },
                { 
                    latin: "Amicitiam docuit", 
                    english: "It taught me friendship",
                    nextStep: 35
                },
                { 
                    latin: "Fortitudinem docuit", 
                    english: "It taught me courage",
                    nextStep: 35
                }
            ]
        },

        // ===== STEP 26: TRAVEL DREAMS =====
        {
            id: 26,
            livia: {
                latin: "Iter facere animum aperit! Spero te multas terras visurum. Nunc, colloquium nostrum finire debemus. Vale, {name}! Cras revertare!",
                english: "Traveling opens the mind! I hope you see many lands. Now, we must end our conversation. Farewell, {name}! Return tomorrow!"
            },
            userOptions: [
                { 
                    latin: "Vale, Livia! Gratias!", 
                    english: "Farewell, Livia! Thank you!",
                    nextStep: 0
                },
                { 
                    latin: "Gratias tibi ago! Vale!", 
                    english: "I thank you! Farewell!",
                    nextStep: 0
                },
                { 
                    latin: "Cras revertar! Vale!", 
                    english: "I'll return tomorrow! Farewell!",
                    nextStep: 0
                }
            ]
        }
        // Additional steps can be added following the same pattern
    ],

    // IMPROVED RESPONSE HANDLER WITH NAME EXTRACTION
    getResponse(userMessage, currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
        
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

        // Find the selected option
        let selectedOption = currentStep.userOptions.find(option => {
            // Remove [Nomen] placeholder for matching
            const cleanLatin = option.latin.replace(/\[Nomen\]/g, '').trim();
            return userMessage.includes(cleanLatin) || option.english === userMessage;
        }) || currentStep.userOptions[0];

        // Move to next step
        this.currentStep = selectedOption.nextStep;
        const nextStep = this.conversationSteps[this.currentStep];

        // Personalize Livia's message
        let liviaMessage = { ...nextStep.livia };
        if (currentContext.userName) {
            liviaMessage.latin = liviaMessage.latin.replace(/{name}/g, currentContext.userName);
            liviaMessage.english = liviaMessage.english.replace(/{name}/g, currentContext.userName);
        }

        return {
            latin: liviaMessage.latin,
            english: liviaMessage.english,
            suggestions: nextStep.userOptions.map(opt => ({
                latin: opt.latin.replace(/\[Nomen\]/g, currentContext.userName || '[Name]'),
                english: opt.english.replace(/\[Name\]/g, currentContext.userName || '[Name]')
            }))
        };
    },

    // Get current question for display
    getCurrentQuestion(currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
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
            latin: opt.latin.replace(/\[Nomen\]/g, currentContext.userName || '[Name]'),
            english: opt.english.replace(/\[Name\]/g, currentContext.userName || '[Name]')
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

// Initialize suggestions
let suggestedResponsesData = [];
