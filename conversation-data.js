// conversation-data.js - GUIDED ENGAGING CONVERSATION FLOW
const conversationSystem = {
    // Structured conversation flow for maximum engagement
    currentStep: 0,
    userName: null,
    
    // Conversation steps with clear questions and expected responses
    conversationFlow: [
        // ========== STEP 0: WARM GREETING ==========
        {
            question: {
                latin: "Salve! Ego Livia Valeria sum. Quid nomen tibi est?",
                english: "Hello! I am Livia Valeria. What is your name?"
            },
            responses: {
                // Expected response patterns
                patterns: [
                    /(?:mihi nomen est|my name is|I am|I'm|nomen mihi est|me vocant|they call me)\s+([A-Za-z]+)/i,
                    /^([A-Za-z]{2,})$/i
                ],
                // Suggested buttons
                suggestions: [
                    { latin: "Mihi nomen [Nomen] est", english: "My name is..." },
                    { latin: "Nescio", english: "I don't know" }
                ]
            },
            answers: [
                {
                    latin: "Salve [NAME]! Nomen dulce est. Gaudeo te cognoscere!",
                    english: "Hello [NAME]! That's a sweet name. Pleased to meet you!"
                },
                {
                    latin: "Ah, sine nomine es! Non est problema. Potes mihi nomen tuum dicere cum voles.",
                    english: "Ah, you're without a name! No problem. You can tell me your name whenever you want."
                }
            ],
            nextStep: 1
        },

        // ========== STEP 1: ORIGIN STORY ==========
        {
            question: {
                latin: "[NAME], unde in mundo venis?",
                english: "[NAME], where in the world do you come from?"
            },
            responses: {
                patterns: [
                    /(rome|italy|italia|roman)/i,
                    /(america|united states|us|usa|canada)/i,
                    /(europe|germany|france|spain|britain)/i,
                    /(asia|china|japan|india)/i,
                    /(here|near|close|vicinus)/i
                ],
                suggestions: [
                    { latin: "Ex America sum", english: "I'm from America" },
                    { latin: "Ex Europa venio", english: "I come from Europe" },
                    { latin: "Romanus sum", english: "I'm Roman" },
                    { latin: "Hic habito", english: "I live here" }
                ]
            },
            answers: [
                {
                    trigger: ["rome", "italy", "italia", "roman"],
                    latin: "Tu es Romanus? Optime! Ego in villa prope Romam habito. Amasne urbem nostram?",
                    english: "You're Roman? Excellent! I live in a villa near Rome. Do you love our city?"
                },
                {
                    trigger: ["america", "united states", "us", "usa", "canada"],
                    latin: "Terra trans oceanum! Audivi terras illas esse ingentes et liberas. Estne verum?",
                    english: "Lands across the ocean! I've heard those lands are vast and free. Is it true?"
                },
                {
                    trigger: ["europe", "germany", "france", "spain", "britain"],
                    latin: "Provinciae Romanae! Estne vita ibi similis vitae Romanae?",
                    english: "Roman provinces! Is life there similar to Roman life?"
                },
                {
                    trigger: ["asia", "china", "japan", "india"],
                    latin: "Terras orientales! Mercatores de silk road mirabilia narrant. Estne terra pulchra?",
                    english: "Eastern lands! Merchants tell wonderful stories about the silk road. Is it a beautiful land?"
                },
                {
                    trigger: ["here", "near", "close", "vicinus"],
                    latin: "Vicinus es! Spero te visitare Romam aliquando. Urbs magnifica est!",
                    english: "You're nearby! I hope you visit Rome sometime. The city is magnificent!"
                }
            ],
            nextStep: 2
        },

        // ========== STEP 2: CURRENT FEELING ==========
        {
            question: {
                latin: "Dic mihi, [NAME], quomodo te hodie habes?",
                english: "Tell me, [NAME], how are you feeling today?"
            },
            responses: {
                patterns: [
                    /(good|well|fine|bene|happy|great|laetus)/i,
                    /(bad|tired|sad|malus|tristis|fessus)/i,
                    /(curious|interested|curiosus)/i,
                    /(confused|lost|nescio)/i
                ],
                suggestions: [
                    { latin: "Bene valeo!", english: "I'm doing well!" },
                    { latin: "Fatigatus sum", english: "I'm tired" },
                    { latin: "Curiosus sum", english: "I'm curious" },
                    { latin: "Nescio", english: "I'm not sure" }
                ]
            },
            answers: [
                {
                    trigger: ["good", "well", "fine", "bene", "happy", "great", "laetus"],
                    latin: "Gaudeo te bene valere! Hodie in horto meo rosas colui. Sol lucet et aves cantant.",
                    english: "I'm glad you're well! Today I cultivated roses in my garden. The sun shines and birds sing."
                },
                {
                    trigger: ["bad", "tired", "sad", "malus", "tristis", "fessus"],
                    latin: "Me paenitet. Saepe me adiuvat ambulatio in horto. Natura animum sanat.",
                    english: "I'm sorry. Walking in the garden often helps me. Nature heals the soul."
                },
                {
                    trigger: ["curious", "interested", "curiosus"],
                    latin: "Curiositas signum animi viventis est! Visne de vita Romana audire?",
                    english: "Curiosity is a sign of a living soul! Would you like to hear about Roman life?"
                },
                {
                    trigger: ["confused", "lost", "nescio"],
                    latin: "Aliquando etiam ego confundor. Noli timere! Loquamur de rebus iucundis.",
                    english: "Sometimes I get confused too. Don't worry! Let's talk about pleasant things."
                }
            ],
            nextStep: 3
        },

        // ========== STEP 3: ROMAN LIFE INTRODUCTION ==========
        {
            question: {
                latin: "Visne audire de vita cotidiana Romana?",
                english: "Would you like to hear about daily Roman life?"
            },
            responses: {
                patterns: [
                    /(yes|please|certainly|certe|volo)/i,
                    /(no|not now|maybe later|nunc non)/i,
                    /(tell|narra|describe)/i
                ],
                suggestions: [
                    { latin: "Certe! Narra mihi", english: "Certainly! Tell me" },
                    { latin: "Maxime volo!", english: "I really want to!" },
                    { latin: "De tua vita narra", english: "Tell me about your life" }
                ]
            },
            answers: [
                {
                    trigger: ["yes", "please", "certainly", "certe", "volo", "tell", "narra", "describe", "maxime"],
                    latin: "Optime! In Roma, vita incipit cum sole. Mane cibum sumimus: panem, caseum, olivas...",
                    english: "Excellent! In Rome, life begins with the sun. In the morning we eat: bread, cheese, olives..."
                },
                {
                    trigger: ["no", "not now", "maybe later", "nunc non"],
                    latin: "Intellegeo. Saepe ego quoque amo quietem. Quid tu hodie fecisti?",
                    english: "I understand. I often love quiet too. What did you do today?"
                }
            ],
            nextStep: 4
        },

        // ========== STEP 4: DAILY ACTIVITIES ==========
        {
            question: {
                latin: "Quid facis in vita cotidiana?",
                english: "What do you do in your daily life?"
            },
            responses: {
                patterns: [
                    /(work|labor|job|officium)/i,
                    /(school|schola|study|disco)/i,
                    /(read|books|legere|librum)/i,
                    /(music|cantare|saltare)/i,
                    /(sports|exercere|athleta)/i,
                    /(nothing|nihil|rest|quiesco)/i
                ],
                suggestions: [
                    { latin: "Laboro", english: "I work" },
                    { latin: "In schola disco", english: "I study in school" },
                    { latin: "Libros lego", english: "I read books" },
                    { latin: "Nihil facio", english: "I do nothing" }
                ]
            },
            answers: [
                {
                    trigger: ["work", "labor", "job", "officium"],
                    latin: "Labor omnia vincit! Ego quoque habeo responsabilitates. Epistulas scribo, hortum colo...",
                    english: "Work conquers all! I also have responsibilities. I write letters, cultivate the garden..."
                },
                {
                    trigger: ["school", "schola", "study", "disco"],
                    latin: "Discere semper bonum est! Ego ipse libros Graecos lego. Quid discis?",
                    english: "Learning is always good! I myself read Greek books. What do you study?"
                },
                {
                    trigger: ["read", "books", "legere", "librum"],
                    latin: "Lectio animi pabulum est! Ego philosophiam et poetas amo. Quem poetam legis?",
                    english: "Reading is food for the soul! I love philosophy and poets. Which poet do you read?"
                },
                {
                    trigger: ["music", "cantare", "saltare"],
                    latin: "Musica animam elevat! Ego citharam tangere disco. Canisne aut saltas?",
                    english: "Music lifts the soul! I'm learning to play the lyre. Do you sing or dance?"
                },
                {
                    trigger: ["sports", "exercere", "athleta"],
                    latin: "Corpus exercere salubre est! Ego in palaestra ambulo. Athletas in Circo Maximo specto.",
                    english: "Exercising the body is healthy! I walk in the wrestling school. I watch athletes in Circus Maximus."
                },
                {
                    trigger: ["nothing", "nihil", "rest", "quiesco"],
                    latin: "Aliquando otium necessarium est! Ego quoque amo quietem in horto meo.",
                    english: "Sometimes rest is necessary! I also love quiet time in my garden."
                }
            ],
            nextStep: 5
        },

        // ========== STEP 5: GARDEN & NATURE ==========
        {
            question: {
                latin: "In horto meo multae res crescunt. Amasne plantas et flores?",
                english: "Many things grow in my garden. Do you like plants and flowers?"
            },
            responses: {
                patterns: [
                    /(yes|love|amo|like|placet)/i,
                    /(no|not really|non)/i,
                    /(garden|hortus|plants|flores)/i
                ],
                suggestions: [
                    { latin: "Maxime amo!", english: "I love them very much!" },
                    { latin: "Non multum curo", english: "I don't care much" },
                    { latin: "Habeo hortum", english: "I have a garden" }
                ]
            },
            answers: [
                {
                    trigger: ["yes", "love", "amo", "like", "placet", "garden", "hortus", "plants", "flores", "maxime"],
                    latin: "Gaudeo! Rosae rubrae et lilium candidum in horto meo crescunt. Sunt dona deorum.",
                    english: "I'm glad! Red roses and white lilies grow in my garden. They are gifts from the gods."
                },
                {
                    trigger: ["no", "not really", "non", "multum"],
                    latin: "Intellegeo. Non omnes eadem amant. Fortasse alia te delectant?",
                    english: "I understand. Not everyone loves the same things. Perhaps other things delight you?"
                }
            ],
            nextStep: 6
        },

        // ========== STEP 6: ROMAN CULTURE ==========
        {
            question: {
                latin: "Visne audire de spectaculis Romanis? De gladiatoribus in Colosseo?",
                english: "Would you like to hear about Roman spectacles? About gladiators in the Colosseum?"
            },
            responses: {
                patterns: [
                    /(yes|please|certe|volo|tell)/i,
                    /(no|not now|alio tempore)/i,
                    /(gladiators|colosseum|spectacles)/i
                ],
                suggestions: [
                    { latin: "Certe! De gladiatoribus narra", english: "Certainly! Tell me about gladiators" },
                    { latin: "De Colosseo narra", english: "Tell me about the Colosseum" },
                    { latin: "Non nunc", english: "Not now" }
                ]
            },
            answers: [
                {
                    trigger: ["yes", "please", "certe", "volo", "tell", "gladiators", "colosseum", "spectacles"],
                    latin: "Colosseum est maximum spectacularum! Gladiatores fortiter pugnant. Populus exultat!",
                    english: "The Colosseum is the greatest spectacle! Gladiators fight bravely. The people cheer!"
                },
                {
                    trigger: ["no", "not now", "alio tempore", "non nunc"],
                    latin: "Intellegeo. Sunt et alia mirabilia Romae. Thermae, templa, fora...",
                    english: "I understand. There are other wonders in Rome. Baths, temples, forums..."
                }
            ],
            nextStep: 7
        },

        // ========== STEP 7: PHILOSOPHY & WISDOM ==========
        {
            question: {
                latin: "Seneca dicit: 'Non scholae sed vitae discimus.' Credisne hoc verum esse?",
                english: "Seneca says: 'We learn not for school but for life.' Do you believe this is true?"
            },
            responses: {
                patterns: [
                    /(yes|certe|true|verum)/i,
                    /(no|non|not really)/i,
                    /(sometimes|aliquando)/i,
                    /(nescio|don't know)/i
                ],
                suggestions: [
                    { latin: "Certe verum est!", english: "Certainly true!" },
                    { latin: "Non credo", english: "I don't believe so" },
                    { latin: "Nescio", english: "I don't know" }
                ]
            },
            answers: [
                {
                    trigger: ["yes", "certe", "true", "verum"],
                    latin: "Sapienter dicis! Vita ipsa est magister optimus. Omnia quae vivimus nos docent.",
                    english: "You speak wisely! Life itself is the best teacher. Everything we experience teaches us."
                },
                {
                    trigger: ["no", "non", "not really"],
                    latin: "Interessant! Forsitan schola fundamenta praebet, sed vita aedificat.",
                    english: "Interesting! Perhaps school provides foundations, but life builds upon them."
                },
                {
                    trigger: ["sometimes", "aliquando"],
                    latin: "Verum dicis. Aliquando schola docet, aliquando vita. Utraque necessaria sunt.",
                    english: "You speak truth. Sometimes school teaches, sometimes life. Both are necessary."
                },
                {
                    trigger: ["nescio", "don't know"],
                    latin: "Haec quaestio profunda est. Tempore discimus veritatem.",
                    english: "This question is deep. With time we learn the truth."
                }
            ],
            nextStep: 8
        },

        // ========== STEP 8: PERSONAL REFLECTION ==========
        {
            question: {
                latin: "[NAME], quid in vita tua te maxime delectat?",
                english: "[NAME], what brings you the most joy in your life?"
            },
            responses: {
                patterns: [
                    /(family|familia|friends|amici)/i,
                    /(work|labor|achievements)/i,
                    /(hobbies|music|sports|books)/i,
                    /(travel|nature|animals)/i,
                    /(nescio|don't know)/i
                ],
                suggestions: [
                    { latin: "Familia mea", english: "My family" },
                    { latin: "Amici mei", english: "My friends" },
                    { latin: "Meum opus", english: "My work" },
                    { latin: "Nescio", english: "I don't know" }
                ]
            },
            answers: [
                {
                    trigger: ["family", "familia", "friends", "amici"],
                    latin: "Pulchrum est! Familia et amici thesauri vitae sunt. Ego quoque meam familiam amo.",
                    english: "Beautiful! Family and friends are life's treasures. I also love my family."
                },
                {
                    trigger: ["work", "labor", "achievements"],
                    latin: "Labor te beatum facit! Bonum est habere propositum in vita.",
                    english: "Work makes you blessed! It's good to have purpose in life."
                },
                {
                    trigger: ["hobbies", "music", "sports", "books"],
                    latin: "Gaudeo te habere quae te delectant! Haec res vitam iucundiorem faciunt.",
                    english: "I'm glad you have things that delight you! These things make life more pleasant."
                },
                {
                    trigger: ["travel", "nature", "animals"],
                    latin: "Mundus plenus est mirabilium! Explorare et admirari bonum est.",
                    english: "The world is full of wonders! It's good to explore and admire."
                },
                {
                    trigger: ["nescio", "don't know"],
                    latin: "Forsitan adhuc invenies. Vita est iter, non destinatio.",
                    english: "Perhaps you will still find it. Life is a journey, not a destination."
                }
            ],
            nextStep: 9
        },

        // ========== STEP 9: FAREWELL WITH IMPACT ==========
        {
            question: {
                latin: "Tempus discedendi appropinquat, [NAME]. Sed prius... habesne aliquam quaestionem de Roma?",
                english: "The time to leave approaches, [NAME]. But first... do you have any question about Rome?"
            },
            responses: {
                patterns: [
                    /(yes|habeo|quaestionem)/i,
                    /(no|non habeo)/i,
                    /(food|cena|culina)/i,
                    /(gods|deos|religion)/i,
                    /(emperor|imperator)/i
                ],
                suggestions: [
                    { latin: "De cena Romana", english: "About Roman dinner" },
                    { latin: "De diis Romanis", english: "About Roman gods" },
                    { latin: "De imperatore", english: "About the emperor" },
                    { latin: "Non habeo", english: "I don't have one" }
                ]
            },
            answers: [
                {
                    trigger: ["food", "cena", "culina"],
                    latin: "Cenam Romanam amo! Pultem, carnes, pisces, et multas legumes. Cum amicos cenare optimum est!",
                    english: "I love Roman dinner! Porridge, meats, fish, and many vegetables. Dining with friends is best!"
                },
                {
                    trigger: ["gods", "deos", "religion"],
                    latin: "Romani multos deos colunt. Ego Minervam, deam sapientiae, adoro. Et tu?",
                    english: "Romans worship many gods. I worship Minerva, goddess of wisdom. And you?"
                },
                {
                    trigger: ["emperor", "imperator"],
                    latin: "Imperator noster est Caesar Augustus. Pacem et prosperitatem attulit. Deus est!",
                    english: "Our emperor is Caesar Augustus. He brought peace and prosperity. He is a god!"
                },
                {
                    trigger: ["yes", "habeo", "quaestionem"],
                    latin: "Quaestionem tuam libenter audio! Dic mihi quid vis scire.",
                    english: "I gladly hear your question! Tell me what you want to know."
                },
                {
                    trigger: ["no", "non habeo"],
                    latin: "Nullum problema! Fuit mihi iucundum tecum colloqui, [NAME]. Spero te iterum visitare!",
                    english: "No problem! It was pleasant to speak with you, [NAME]. I hope you visit again!"
                }
            ],
            nextStep: 10
        },

        // ========== STEP 10: FINAL FAREWELL ==========
        {
            question: {
                latin: "Vale, [NAME]! Memoria nostri colloquii semper mecum manebit. Spero te cras iterum visurum!",
                english: "Farewell, [NAME]! The memory of our conversation will always stay with me. I hope to see you again tomorrow!"
            },
            responses: {
                patterns: [/.*/], // Accept any response
                suggestions: [
                    { latin: "Vale, Livia!", english: "Farewell, Livia!" },
                    { latin: "Gratias tibi ago!", english: "Thank you!" },
                    { latin: "Cras revertar!", english: "I'll return tomorrow!" }
                ]
            },
            answers: [
                {
                    latin: "Fuit mihi iucundum! Spes mecum est te iterum visurum. Vale et bene tibi eveniat!",
                    english: "It was my pleasure! I hope to see you again. Farewell and may good things happen to you!"
                }
            ],
            nextStep: 0 // Reset conversation
        }
    ],

    // Main response function
    getResponse(userMessage, currentContext) {
        const message = userMessage.toLowerCase().trim();
        
        // Extract name if not already set
        if (!currentContext.userName && this.currentStep === 0) {
            const namePatterns = [
                /(?:mihi nomen est|my name is|I am|I'm|nomen mihi est)\s+([A-Za-z]+)/i,
                /^([A-Za-z]{2,})$/i
            ];
            
            for (const pattern of namePatterns) {
                const nameMatch = message.match(pattern);
                if (nameMatch && nameMatch[1]) {
                    currentContext.userName = nameMatch[1];
                    break;
                }
            }
        }

        // Get current step
        const currentStep = this.conversationFlow[this.currentStep];
        
        // Find matching answer
        let answer = currentStep.answers[0]; // Default to first answer
        
        for (const ans of currentStep.answers) {
            if (ans.trigger) {
                for (const trigger of ans.trigger) {
                    if (message.includes(trigger)) {
                        answer = ans;
                        break;
                    }
                }
            }
        }

        // Move to next step
        this.currentStep = currentStep.nextStep;
        
        // Personalize response
        let finalAnswer = { ...answer };
        if (currentContext.userName) {
            if (finalAnswer.latin) {
                finalAnswer.latin = finalAnswer.latin.replace(/\[NAME\]/g, currentContext.userName);
            }
            if (finalAnswer.english) {
                finalAnswer.english = finalAnswer.english.replace(/\[NAME\]/g, currentContext.userName);
            }
        }

        return {
            latin: finalAnswer.latin,
            english: finalAnswer.english,
            suggestions: this.conversationFlow[this.currentStep]?.responses?.suggestions || []
        };
    },

    // Get current question for display
    getCurrentQuestion(currentContext) {
        const currentStep = this.conversationFlow[this.currentStep];
        let question = { ...currentStep.question };
        
        if (currentContext.userName) {
            question.latin = question.latin.replace(/\[NAME\]/g, currentContext.userName);
            question.english = question.english.replace(/\[NAME\]/g, currentContext.userName);
        }
        
        return question;
    },

    // Get suggestions for current step
    getCurrentSuggestions() {
        return this.conversationFlow[this.currentStep]?.responses?.suggestions || [];
    },

    resetConversation() {
        this.currentStep = 0;
        return {
            userName: null,
            knowsName: false
        };
    }
};

// Enhanced suggested responses that change with conversation flow
const suggestedResponsesData = conversationSystem.getCurrentSuggestions();
