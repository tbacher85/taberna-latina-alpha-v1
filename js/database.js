// ==================== SUPABASE CONFIGURATION ====================
// REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://dwzhiqtqfsfcxkkaghzi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3emhpcXRxZnNmY3hra2FnaHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTU3NTgsImV4cCI6MjA3OTA5MTc1OH0.kYFO-FJtu_Ry43mi7JRevDj68Ktwov12LJg5juEvZQA';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== TEST USER CONFIGURATION ====================
const TEST_EMAILS = [
    'timothe.bacher@gmail.com',  // Your test email
    'your-other-email@gmail.com' // Add more test emails here
];

// ==================== DATABASE FUNCTIONS ====================
async function trackMessage(userId, latinText, englishText, isUser) {
    const today = new Date().toISOString().split('T')[0];
    
    try {
        // Update daily usage
        const { data: usageData, error: usageError } = await supabase
            .from('user_usage')
            .select('*')
            .eq('user_id', userId)
            .eq('date', today)
            .single();
            
        if (usageError && usageError.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error fetching usage data:', usageError);
        }
        
        let newCount;
        
        if (usageData) {
            // Update existing
            newCount = usageData.messages_sent + 1;
            const { error: updateError } = await supabase
                .from('user_usage')
                .update({ 
                    messages_sent: newCount,
                    last_active: new Date()
                })
                .eq('id', usageData.id);
                
            if (updateError) {
                console.error('Error updating usage:', updateError);
                return 0;
            }
        } else {
            // Create new
            newCount = 1;
            const { error: insertError } = await supabase
                .from('user_usage')
                .insert([{
                    user_id: userId,
                    date: today,
                    messages_sent: newCount,
                    last_active: new Date()
                }]);
                
            if (insertError) {
                console.error('Error inserting usage:', insertError);
                return 0;
            }
        }
        
        // Log conversation
        const { error: conversationError } = await supabase
            .from('conversations')
            .insert([{
                user_id: userId,
                user_message: isUser ? latinText : null,
                ai_message: !isUser ? latinText : null,
                ai_translation: !isUser ? englishText : null,
                created_at: new Date()
            }]);
        
        if (conversationError) {
            console.error('Error logging conversation:', conversationError);
        }
        
        // Track limit hits
        if (newCount >= 10) { // DAILY_MESSAGE_LIMIT
            const { error: limitError } = await supabase
                .from('limit_hits')
                .insert([{
                    user_id: userId,
                    hit_time: new Date(),
                    message_count: newCount
                }]);
                
            if (limitError) {
                console.error('Error logging limit hit:', limitError);
            }
        }
        
        return newCount;
    } catch (error) {
        console.error('Unexpected error tracking message:', error);
        return 0;
    }
}

async function loadUserData(userId) {
    const today = new Date().toISOString().split('T')[0];
    try {
        const { data, error } = await supabase
            .from('user_usage')
            .select('messages_sent')
            .eq('user_id', userId)
            .eq('date', today)
            .single();
            
        if (error) {
            if (error.code === 'PGRST116') { // No rows found
                return 0;
            }
            console.error('Error loading user data:', error);
            return 0;
        }
        
        return data ? data.messages_sent : 0;
    } catch (error) {
        console.error('Unexpected error loading user data:', error);
        return 0;
    }
}

// Make functions available globally
window.trackMessage = trackMessage;
window.loadUserData = loadUserData;
window.supabase = supabase;
window.TEST_EMAILS = TEST_EMAILS;

console.log('Database functions exposed to window');
