// ==================== SUPABASE CONFIGURATION ====================
// REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://bavnxkkodtdstccfkkcsn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdm54a2tvZHRkc3RjY2ZrY2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NDg0MzEsImV4cCI6MjAyMzQyNDQzMX0.2P4l3_YR0E6k6z7n4Q7z4Q7z4Q7z4Q7z4Q7z4Q7z4Q';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== TEST USER CONFIGURATION ====================
const TEST_EMAILS = [
    'timothe.bacher@gmail.com',  // Your test email
    'test@example.com'           // Add more test emails here
];

// ==================== DATABASE FUNCTIONS ====================
async function trackMessage(userId, latinText, englishText, isUser) {
    const today = new Date().toISOString().split('T')[0];
    
    try {
        // Update daily usage
        const { data: usageData } = await supabase
            .from('user_usage')
            .select('*')
            .eq('user_id', userId)
            .eq('date', today)
            .single();
            
        if (usageData) {
            await supabase
                .from('user_usage')
                .update({ 
                    messages_sent: usageData.messages_sent + 1,
                    last_active: new Date()
                })
                .eq('id', usageData.id);
        } else {
            await supabase
                .from('user_usage')
                .insert([{
                    user_id: userId,
                    date: today,
                    messages_sent: 1,
                    last_active: new Date()
                }]);
        }
        
        // Log conversation
        await supabase
            .from('conversations')
            .insert([{
                user_id: userId,
                user_message: isUser ? latinText : null,
                ai_message: !isUser ? latinText : null,
                ai_translation: !isUser ? englishText : null,
                created_at: new Date()
            }]);
        
        // Track limit hits
        const newCount = usageData ? usageData.messages_sent + 1 : 1;
        if (newCount >= DAILY_MESSAGE_LIMIT) {
            await supabase
                .from('limit_hits')
                .insert([{
                    user_id: userId,
                    hit_time: new Date(),
                    message_count: newCount
                }]);
        }
        
        return newCount;
    } catch (error) {
        console.error('Error tracking message:', error);
        return 0;
    }
}

async function loadUserData(userId) {
    const today = new Date().toISOString().split('T')[0];
    try {
        const { data } = await supabase
            .from('user_usage')
            .select('messages_sent')
            .eq('user_id', userId)
            .eq('date', today)
            .single();
            
        return data ? data.messages_sent : 0;
    } catch (error) {
        console.error('Error loading user data:', error);
        return 0;
    }
}
