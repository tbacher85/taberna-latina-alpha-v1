// conversation-data.js
const conversationScenarios = {
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
};

// Suggested responses that can be easily updated - CHANGED VARIABLE NAME
const suggestedResponsesData = [
    { latin: "Mihi nomen [Nomen] est", english: "My name is..." },
    { latin: "Salve Livia! Quomodo vales?", english: "How are you?" },
    { latin: "De te ipsa narra mihi", english: "Tell me about yourself" },
    { latin: "Quid hodie fecisti?", english: "What did you do today?" },
    { latin: "De familia tua narra", english: "Tell me about your family" },
    { latin: "Quae animalia amas?", english: "Which animals do you like?" },
    { latin: "Ubi habitas?", english: "Where do you live?" },
    { latin: "Quid in futuro facere vis?", english: "What do you want to do in the future?" },
    { latin: "Quae tempestas tibi placet?", english: "What weather do you like?" }
];
