// conversation-data.js - SCRIPTED SCENARIO CONVERSATION
// Livia drives the entire conversation with direct question-response pairs

const conversationSystem = {
    currentStep: 0,
    userName: null,
    
    // TIGHTLY SCRIPTED CONVERSATION: Livia asks, user picks from direct responses
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
                    latin: "Mihi nomen Tim est", 
                    english: "My name is Tim",
                    nextStep: 2
                },
                { 
                    latin: "Maria mihi nomen est", 
                    english: "My name is Maria",
                    nextStep: 2
                },
                { 
                    latin: "Marcus sum", 
                    english: "I am Marcus",
                    nextStep: 2
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
                    latin: "Certe! Volo discere", 
                    english: "Certainly! I want to learn",
                    nextStep: 3
                },
                { 
                    latin: "Maxime volo!", 
                    english: "I really want to!",
                    nextStep: 3
                },
                { 
                    latin: "Ita, quaeso", 
                    english: "Yes, please",
                    nextStep: 3
                }
            ]
        },

        // ===== STEP 3: DAILY ROMAN LIFE =====
        {
            id: 3,
            livia: {
                latin: "Optime! In Roma, vita incipit cum sole. Mane cibum sumimus, deinde aut in forum aut in thermas imus. Quid vis primum audire?",
                english: "Excellent! In Rome, life begins with the sun. In the morning we eat, then we go either to the forum or to the baths. What would you like to hear first?"
            },
            userOptions: [
                { 
                    latin: "De foro Romano", 
                    english: "About the Roman Forum",
                    nextStep: 4
                },
                { 
                    latin: "De thermis", 
                    english: "About the baths",
                    nextStep: 5
                },
                { 
                    latin: "De cena Romana", 
                    english: "About Roman dinner",
                    nextStep: 6
                }
            ]
        },

        // ===== STEP 4: ROMAN FORUM =====
        {
            id: 4,
            livia: {
                latin: "Forum Romanum cor urbis est! Ibi mercatores vendunt, senatores disputant, et amici colloquuntur. Omnia ibi fiunt! Visne plus audire de mercatoribus an de senatoribus?",
                english: "The Roman Forum is the heart of the city! There merchants sell, senators debate, and friends chat. Everything happens there! Would you like to hear more about merchants or senators?"
            },
            userOptions: [
                { 
                    latin: "De mercatoribus", 
                    english: "About merchants",
                    nextStep: 7
                },
                { 
                    latin: "De senatoribus", 
                    english: "About senators",
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
                latin: "Thermae non solum ad lavandum sunt! Ibi socializamus, negotia agimus, et relaxamus. Aqua calida et frigida, unctores qui nos ungunt... estne interesting?",
                english: "The baths are not just for washing! There we socialize, do business, and relax. Hot and cold water, ointment-rubbers who massage us... is it interesting?"
            },
            userOptions: [
                { 
                    latin: "Valde interesting!", 
                    english: "Very interesting!",
                    nextStep: 10
                },
                { 
                    latin: "Narra plus", 
                    english: "Tell me more",
                    nextStep: 10
                },
                { 
                    latin: "De socializatione", 
                    english: "About socialization",
                    nextStep: 10
                }
            ]
        },

        // ===== STEP 6: ROMAN DINNER =====
        {
            id: 6,
            livia: {
                latin: "Cena Romana tempus sociale est! Pultem, carnes, pisces, et multas legumes edimus. Cum amicus recumbimus et diu colloquimur. Amasne cenare cum amicis?",
                english: "Roman dinner is social time! We eat porridge, meats, fish, and many vegetables. We recline with friends and chat for a long time. Do you like dining with friends?"
            },
            userOptions: [
                { 
                    latin: "Ita, amo", 
                    english: "Yes, I love it",
                    nextStep: 11
                },
                { 
                    latin: "Aliquando", 
                    english: "Sometimes",
                    nextStep: 11
                },
                { 
                    latin: "Non saepe", 
                    english: "Not often",
                    nextStep: 11
                }
            ]
        },

        // ===== STEP 7: MERCHANTS =====
        {
            id: 7,
            livia: {
                latin: "Mercatores omnia vendunt! Olivas ex Hispania, serica ex Sinarum, aromata ex India... Roma totum mundum adit. Nonne mirabile est?",
                english: "Merchants sell everything! Olives from Spain, silk from China, spices from India... Rome reaches the whole world. Isn't it wonderful?"
            },
            userOptions: [
                { 
                    latin: "Mirabile est!", 
                    english: "It's wonderful!",
                    nextStep: 12
                },
                { 
                    latin: "Roma potens est", 
                    english: "Rome is powerful",
                    nextStep: 12
                },
                { 
                    latin: "De olivis", 
                    english: "About olives",
                    nextStep: 12
                }
            ]
        },

        // ===== STEP 8: SENATORS =====
        {
            id: 8,
            livia: {
                latin: "Senatores de republica disputant! In Curia, leges creant et de bello paceque decernunt. Potestas magna est in eorum manibus. Visne scire quomodo hoc fit?",
                english: "Senators debate about the republic! In the Senate House, they create laws and decide about war and peace. Great power is in their hands. Do you want to know how this happens?"
            },
            userOptions: [
                { 
                    latin: "Certe volo", 
                    english: "Certainly I want to",
                    nextStep: 13
                },
                { 
                    latin: "Est interesting", 
                    english: "It's interesting",
                    nextStep: 13
                },
                { 
                    latin: "Non multum curo", 
                    english: "I don't care much",
                    nextStep: 14
                }
            ]
        },

        // ===== STEP 9: FRIENDS IN FORUM =====
        {
            id: 9,
            livia: {
                latin: "In foro cum amicis colloquor! De vita, de philosophia, de poetis... tempus felix est. Habesne amicos cum quibus de profundis rebus loqueris?",
                english: "In the forum I chat with friends! About life, philosophy, poets... it's happy time. Do you have friends with whom you talk about deep things?"
            },
            userOptions: [
                { 
                    latin: "Ita, habeo", 
                    english: "Yes, I have",
                    nextStep: 15
                },
                { 
                    latin: "Non multos", 
                    english: "Not many",
                    nextStep: 15
                },
                { 
                    latin: "Aliquando", 
                    english: "Sometimes",
                    nextStep: 15
                }
            ]
        },

        // ===== STEP 10: BATH SOCIAL LIFE =====
        {
            id: 10,
            livia: {
                latin: "In thermis, omnes classes sociales conveniunt! Pauperes et divites, servii et liberi... aqua omnes aequat. Hoc democratiam Romanam repraesentat, nonne?",
                english: "In the baths, all social classes meet! Poor and rich, slaves and free... water makes everyone equal. This represents Roman democracy, doesn't it?"
            },
            userOptions: [
                { 
                    latin: "Ita, certe!", 
                    english: "Yes, certainly!",
                    nextStep: 16
                },
                { 
                    latin: "Idea interesting", 
                    english: "Interesting idea",
                    nextStep: 16
                },
                { 
                    latin: "Non cogitaveram", 
                    english: "I hadn't thought of that",
                    nextStep: 16
                }
            ]
        },

        // ===== STEP 11: FRIENDSHIP PHILOSOPHY =====
        {
            id: 11,
            livia: {
                latin: "Cicero dicit: 'Amicitia res plurimas continet.' Nihil sine amicis iucundum est. Quid sentis de amicitia?",
                english: "Cicero says: 'Friendship contains very many things.' Nothing is pleasant without friends. What do you feel about friendship?"
            },
            userOptions: [
                { 
                    latin: "Amicitia vita est", 
                    english: "Friendship is life",
                    nextStep: 17
                },
                { 
                    latin: "Amici importantes sunt", 
                    english: "Friends are important",
                    nextStep: 17
                },
                { 
                    latin: "Difficile est", 
                    english: "It's difficult",
                    nextStep: 17
                }
            ]
        },

        // ===== STEP 12: ROMAN COMMERCE =====
        {
            id: 12,
            livia: {
                latin: "Mercatores narrant mirabilia! Elephantos in Africa, pyramides in Aegypto, dracones in India... Roma totum mundum novit. Visne audire de his mirabilibus?",
                english: "Merchants tell wonders! Elephants in Africa, pyramids in Egypt, dragons in India... Rome knows the whole world. Do you want to hear about these wonders?"
            },
            userOptions: [
                { 
                    latin: "Maxime volo!", 
                    english: "I really want to!",
                    nextStep: 18
                },
                { 
                    latin: "De draconibus", 
                    english: "About dragons",
                    nextStep: 18
                },
                { 
                    latin: "De elephantis", 
                    english: "About elephants",
                    nextStep: 18
                }
            ]
        },

        // ===== STEP 13: SENATE PROCESS =====
        {
            id: 13,
            livia: {
                latin: "Senatores leges creant! Primo, de re disputant; deinde, sententias ferunt; postremo, Caesari leges offerunt. Ordo et ratio in omnibus! Quid de hoc ordine sentis?",
                english: "Senators create laws! First, they debate the matter; then, they cast votes; finally, they offer laws to Caesar. Order and reason in everything! What do you feel about this order?"
            },
            userOptions: [
                { 
                    latin: "Ordo bonus est", 
                    english: "Order is good",
                    nextStep: 19
                },
                { 
                    latin: "Sapienter", 
                    english: "Wisely",
                    nextStep: 19
                },
                { 
                    latin: "Complicatum est", 
                    english: "It's complicated",
                    nextStep: 19
                }
            ]
        },

        // ===== STEP 14: CHANGE TOPIC =====
        {
            id: 14,
            livia: {
                latin: "Intellegeo. Non omnes politica amant. Fortasse de poetis aut de philosophia loquamur? Quid tibi placet?",
                english: "I understand. Not everyone loves politics. Perhaps we should talk about poets or philosophy? What do you like?"
            },
            userOptions: [
                { 
                    latin: "De poetis", 
                    english: "About poets",
                    nextStep: 20
                },
                { 
                    latin: "De philosophia", 
                    english: "About philosophy",
                    nextStep: 21
                },
                { 
                    latin: "De arte", 
                    english: "About art",
                    nextStep: 22
                }
            ]
        },

        // ===== STEP 15: FRIENDSHIP DEEP =====
        {
            id: 15,
            livia: {
                latin: "Amici veri rari sunt! Ego habeo paucos amicos fideles. Cum eis de omni re loquor. In vita tua, quis est amicus verus?",
                english: "True friends are rare! I have a few faithful friends. With them I talk about everything. In your life, who is a true friend?"
            },
            userOptions: [
                { 
                    latin: "Familia mea", 
                    english: "My family",
                    nextStep: 23
                },
                { 
                    latin: "Amicus antiquus", 
                    english: "An old friend",
                    nextStep: 23
                },
                { 
                    latin: "Nondum inveni", 
                    english: "I haven't found one yet",
                    nextStep: 23
                }
            ]
        },

        // ===== STEP 16: ROMAN EQUALITY =====
        {
            id: 16,
            livia: {
                latin: "Aqua omnes aequat! In thermis, senator et servus in eadem aqua lavant. Hoc rarum est in mundo, nonne? Quid de hac aequalitate sentis?",
                english: "Water makes everyone equal! In the baths, a senator and a slave bathe in the same water. This is rare in the world, isn't it? What do you feel about this equality?"
            },
            userOptions: [
                { 
                    latin: "Pulchra idea", 
                    english: "Beautiful idea",
                    nextStep: 24
                },
                { 
                    latin: "Rara in mundo", 
                    english: "Rare in the world",
                    nextStep: 24
                },
                { 
                    latin: "Non perfecta", 
                    english: "Not perfect",
                    nextStep: 24
                }
            ]
        },

        // ===== STEP 17: FRIENDSHIP WISDOM =====
        {
            id: 17,
            livia: {
                latin: "Seneca dicit: 'Amicus certus in re incerta cernitur.' In difficultatibus, amici veri apparent. Experitusne es hoc in vita tua?",
                english: "Seneca says: 'A sure friend is discerned in an unsure matter.' In difficulties, true friends appear. Have you experienced this in your life?"
            },
            userOptions: [
                { 
                    latin: "Ita, experitus sum", 
                    english: "Yes, I have experienced it",
                    nextStep: 25
                },
                { 
                    latin: "Non dum", 
                    english: "Not yet",
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
                latin: "Mercatores narrant de Sphinx in Aegypto, de Hanging Gardens in Babylone, de Colosso Rhodi... Mundus plenus est mirabilium! Visne aliquando haec videre?",
                english: "Merchants tell about the Sphinx in Egypt, the Hanging Gardens in Babylon, the Colossus of Rhodes... The world is full of wonders! Do you want to see these someday?"
            },
            userOptions: [
                { 
                    latin: "Maxime cupio!", 
                    english: "I really desire to!",
                    nextStep: 26
                },
                { 
                    latin: "Forsitan", 
                    english: "Perhaps",
                    nextStep: 26
                },
                { 
                    latin: "Difficile est", 
                    english: "It's difficult",
                    nextStep: 26
                }
            ]
        },

        // ===== STEP 19: GOVERNMENT WISDOM =====
        {
            id: 19,
            livia: {
                latin: "Ordo et lex fundamenta societatis sunt! Sine lege, chaos regnat. In patria tua, quomodo leges creantur? Similiterne an diversimode?",
                english: "Order and law are the foundations of society! Without law, chaos reigns. In your country, how are laws created? Similarly or differently?"
            },
            userOptions: [
                { 
                    latin: "Similiter", 
                    english: "Similarly",
                    nextStep: 27
                },
                { 
                    latin: "Diversimode", 
                    english: "Differently",
                    nextStep: 27
                },
                { 
                    latin: "Nescio", 
                    english: "I don't know",
                    nextStep: 27
                }
            ]
        },

        // ===== STEP 20: ROMAN POETS =====
        {
            id: 20,
            livia: {
                latin: "Poetae Romani magni sunt! Vergilius Aeneidem scripsit, Ovidius Metamorphoses, Horatius carmina... Quem poetam praefers?",
                english: "Roman poets are great! Virgil wrote the Aeneid, Ovid the Metamorphoses, Horace poems... Which poet do you prefer?"
            },
            userOptions: [
                { 
                    latin: "Vergilius", 
                    english: "Virgil",
                    nextStep: 28
                },
                { 
                    latin: "Ovidius", 
                    english: "Ovid",
                    nextStep: 28
                },
                { 
                    latin: "Horatius", 
                    english: "Horace",
                    nextStep: 28
                }
            ]
        },

        // ===== STEP 21: ROMAN PHILOSOPHY =====
        {
            id: 21,
            livia: {
                latin: "Philosophia Romana practica est! Seneca, Cicero, Marcus Aurelius... omnes de vita bona docent. Quae sententia philosophica tibi placet?",
                english: "Roman philosophy is practical! Seneca, Cicero, Marcus Aurelius... all teach about the good life. Which philosophical saying do you like?"
            },
            userOptions: [
                { 
                    latin: "Vivere est cogitare", 
                    english: "To live is to think",
                    nextStep: 29
                },
                { 
                    latin: "Carpe diem", 
                    english: "Seize the day",
                    nextStep: 29
                },
                { 
                    latin: "Temperantia virtus", 
                    english: "Moderation is virtue",
                    nextStep: 29
                }
            ]
        },

        // ===== STEP 22: ROMAN ART =====
        {
            id: 22,
            livia: {
                latin: "Ars Romana magnifica est! Statuae, picturae, mosaica... omnia pulchra. In villa mea, multa opera artis habeo. Amasne artem?",
                english: "Roman art is magnificent! Statues, paintings, mosaics... all beautiful. In my villa, I have many works of art. Do you love art?"
            },
            userOptions: [
                { 
                    latin: "Ita, amo", 
                    english: "Yes, I love it",
                    nextStep: 30
                },
                { 
                    latin: "Aliquando", 
                    english: "Sometimes",
                    nextStep: 30
                },
                { 
                    latin: "Non multum", 
                    english: "Not much",
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
                    latin: "De vita tua", 
                    english: "About your life",
                    nextStep: 31
                },
                { 
                    latin: "De futuro", 
                    english: "About the future",
                    nextStep: 32
                },
                { 
                    latin: "Nil habeo", 
                    english: "I have nothing",
                    nextStep: 33
                }
            ]
        },

        // ===== STEP 24: SOCIAL EQUALITY =====
        {
            id: 24,
            livia: {
                latin: "Aequalitas difficile est, sed necessaria! Forsitan aliquando omnes homines aequales erunt. Quid speras de futuro mundi?",
                english: "Equality is difficult, but necessary! Perhaps someday all people will be equal. What do you hope for the future of the world?"
            },
            userOptions: [
                { 
                    latin: "Pacem spero", 
                    english: "I hope for peace",
                    nextStep: 34
                },
                { 
                    latin: "Aequalitatem", 
                    english: "Equality",
                    nextStep: 34
                },
                { 
                    latin: "Nescio", 
                    english: "I don't know",
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
                    latin: "Patientiam", 
                    english: "Patience",
                    nextStep: 35
                },
                { 
                    latin: "Amicitiam", 
                    english: "Friendship",
                    nextStep: 35
                },
                { 
                    latin: "Fortitudinem", 
                    english: "Courage",
                    nextStep: 35
                }
            ]
        },

        // ===== STEP 26: TRAVEL DREAMS =====
        {
            id: 26,
            livia: {
                latin: "Iter facere animum aperit! Spero te multas terras visurum. Nunc, colloquium nostrum finire debemus. Vale, {name}!",
                english: "Traveling opens the mind! I hope you see many lands. Now, we must end our conversation. Farewell, {name}!"
            },
            userOptions: [
                { 
                    latin: "Vale, Livia!", 
                    english: "Farewell, Livia!",
                    nextStep: 0
                },
                { 
                    latin: "Gratias!", 
                    english: "Thank you!",
                    nextStep: 0
                },
                { 
                    latin: "Cras revertar!", 
                    english: "I'll return tomorrow!",
                    nextStep: 0
                }
            ]
        }
        // Note: Steps 27-35 would continue the pattern, but we stop at 26 for this example
        // You can add more steps following the same structure
    ],

    // SIMPLE RESPONSE HANDLER - Direct mapping
    getResponse(userMessage, currentContext) {
        const currentStep = this.conversationSteps[this.currentStep];
        
        // Extract name if in first step
        if (this.currentStep === 0 && !currentContext.userName) {
            const nameMatch = userMessage.match(/([A-Za-z]{2,})/);
            if (nameMatch && nameMatch[1]) {
                currentContext.userName = nameMatch[1];
            }
        }

        // Find the selected option
        let selectedOption = currentStep.userOptions.find(option => 
            option.latin === userMessage || option.english === userMessage
        ) || currentStep.userOptions[0];

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
                latin: opt.latin,
                english: opt.english
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
    getCurrentSuggestions() {
        return this.conversationSteps[this.currentStep]?.userOptions.map(opt => ({
            latin: opt.latin,
            english: opt.english
        })) || [];
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
