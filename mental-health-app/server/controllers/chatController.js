const ChatHistory = require('../models/ChatHistory');
const Assessment = require('../models/Assessment');
const MusicPreference = require('../models/MusicPreference');

// Enhanced Sentiment Analysis
const analyzeSentiment = (text) => {
    const positive = ['happy', 'good', 'great', 'excited', 'love', 'hope', 'relax', 'calm', 'proud', 'awesome', 'wonderful', 'better', 'thanks', 'thank'];
    const negative = ['sad', 'bad', 'depressed', 'anxious', 'scared', 'hate', 'lonely', 'stress', 'tired', 'angry', 'upset', 'fail', 'stupid', 'worthless', 'pain', 'hurt', 'cry', 'overwhelmed', 'panic'];

    let score = 0;
    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    words.forEach(word => {
        if (positive.includes(word)) score += 1;
        if (negative.includes(word)) score -= 1;
    });
    return score;
};

// Response Logic
const generateResponse = async (message, sentiment, hasAssessment, distressLevel, userId, currentContext) => {
    const msg = message.toLowerCase();

    // 0. Context Handling for Music Flow
    if (currentContext && currentContext.type === 'collecting_music_pref') {
        // Assume user is answering mood/genre
        const pref = new MusicPreference({
            user: userId,
            genre: 'unknown', // Default or parse
            mood: msg,
            searchQuery: `${msg} music` // Simple query construction
        });
        await pref.save();

        const searchLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(msg + ' music relaxation ad-free')}`;

        return {
            text: `I've noted that. I recommend listening to some ${msg} music to help you. Here is a link to some videos: ${searchLink}. I suggest picking a long mix to avoid interruptions.`,
            context: null // Clear context
        };
    }

    // 1. Crisis Detection (Highest Priority)
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'want to die', 'harm myself', 'hurt myself', 'overdose'];
    if (crisisKeywords.some(keyword => msg.includes(keyword))) {
        return { text: "I am hearing how much pain you are in right now, and I want you to be safe. Please reach out to a professional or a trusted person immediately. You can call the National Suicide Prevention Lifeline or go to your nearest emergency room. You are not alone.", context: null };
    }

    // 2. Music Request
    if (msg.includes('song') || msg.includes('music') || msg.includes('listen') || msg.includes('play')) {
        const history = await MusicPreference.find({ user: userId }).sort({ date: -1 }).limit(3);

        if (history.length > 0 && (msg.includes('previous') || msg.includes('again') || msg.includes('saved'))) {
            const list = history.map(h => h.mood).join(', ');
            return { text: `Welcome back. You previously listened to: ${list}. Would you like to play one of these or try something new?`, context: { type: 'music_selection' } };
        }

        return {
            text: "Music is a great way to relax. To find the best match for you right now, could you tell me what mood or genre you are looking for? (e.g., calm, lofi, happy, classical)",
            context: { type: 'collecting_music_pref' }
        };
    }

    // 3. High Distress Music Auto-Recommend
    if (distressLevel === 'High' && sentiment < -1) {
        return {
            text: "I hear that you're going through a really tough moment. Sometimes, just listening to calming sounds can help ground us. I'm suggesting some gentle meditation music for you. valid? [Link: https://www.youtube.com/results?search_query=calming+meditation+music]",
            context: null
        };
    }

    // 4. Assessment Nudge
    if (!hasAssessment && sentiment >= 0 && Math.random() > 0.8) {
        return { text: "I'm here to support you. To help me understand your situation better, I gently encourage you to complete the 'Assessment' in the app. It only takes a few minutes.", context: null };
    }

    // 5. Topic Detection & Coping Strategies
    if (msg.includes('stress') || msg.includes('pressure') || msg.includes('overwhelm')) {
        return { text: "It sounds like you're carrying a heavy load right now. Stress can be exhausting. Have you tried the 'Relax' section of our app? Listening to some calming music might help you decompress.", context: null };
    }

    if (msg.includes('anxi') || msg.includes('panic') || msg.includes('scared') || msg.includes('nervous')) {
        return { text: "I hear the anxiety in your words, and it's valid to feel this way. Try to focus on your breathing for a moment. Deep, slow breaths can act as an anchor. The 'Flashcards' feature has some grounding reminders that might help too.", context: null };
    }

    if (msg.includes('sad') || msg.includes('depress') || msg.includes('lonely') || msg.includes('cry') || msg.includes('hurt')) {
        if (distressLevel === 'High') {
            return { text: "I'm so sorry you're feeling this pain. You don't have to go through this alone. Please remember to be gentle with yourself today. Reaching out to a friend or therapist can be a brave step.", context: null };
        }
        return { text: "It sounds like a really difficult time. I'm here to listen. Sometimes, just acknowledging these feelings is the first step. You are important and your feelings matter.", context: null };
    }

    if (msg.includes('sleep') || msg.includes('tired') || msg.includes('insomnia')) {
        return { text: "Sleep struggles can really affect how we feel. Creating a consistent routine or listening to soothing sounds (like in our Relax Music section) might help signal your body it's time to rest.", context: null };
    }

    if (msg.includes('thank')) {
        return { text: "You're very welcome. I'm glad I could be here for you. Remember, I'm just a click away whenever you need a supportive ear.", context: null };
    }

    if (msg.includes('hello') || msg.includes('hi ') || msg === 'hi') {
        return { text: "Hello there. I'm here to listen and support you. How are you feeling today?", context: null };
    }

    // 6. Sentiment-Based General Responses
    if (sentiment > 0) {
        return { text: "It makes me happy to hear that! Getting some impactful positivity is wonderful. Keep going!", context: null };
    } else if (sentiment < 0) {
        return { text: "I hear that things are tough right now. I'm here with you. Would you like to try a relaxation activity, or just vent a bit more?", context: null };
    } else {
        return { text: "I'm listening. Tell me more about what's on your mind, or let me know if you'd like suggestions for relaxing.", context: null };
    }
};

// @desc    Send message to chatbot
// @route   POST /api/chat
// @access  Private
const chat = async (req, res) => {
    try {
        const { message, context } = req.body; // Client needs to send 'context' back
        const userId = req.user._id;

        // Fetch user assessment for context
        const latestAssessment = await Assessment.findOne({ user: userId }).sort({ date: -1 });

        const hasAssessment = !!latestAssessment;
        let distressLevel = 'Low';
        if (latestAssessment) {
            if (latestAssessment.riskLevel) {
                if (latestAssessment.riskLevel === 'High Risk') distressLevel = 'High';
                else if (latestAssessment.riskLevel === 'Moderate Risk') distressLevel = 'Moderate';
            } else {
                // Fallback for old data
                const sc = latestAssessment.totalScore !== undefined ? latestAssessment.totalScore : (latestAssessment.score || 0);
                if (sc > 20) distressLevel = 'High';
                else if (sc > 10) distressLevel = 'Moderate';
            }
        }

        const sentiment = analyzeSentiment(message);

        // Generate compassionate response
        const { text: botResponse, context: newContext } = await generateResponse(message, sentiment, hasAssessment, distressLevel, userId, context);

        // Save history
        let history = await ChatHistory.findOne({ user: userId });
        if (!history) {
            history = new ChatHistory({ user: userId, messages: [] });
        }

        history.messages.push({ sender: 'user', text: message });
        history.messages.push({ sender: 'bot', text: botResponse });

        // Limit history size to prevent bloat (optional, keep last 50 messages)
        if (history.messages.length > 50) {
            history.messages = history.messages.slice(history.messages.length - 50);
        }

        await history.save();

        res.json({ response: botResponse, context: newContext });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "I'm having a little trouble thinking right now, but I'm still here. Please try again." });
    }
};

// @desc    Get chat history
// @route   GET /api/chat
// @access  Private
const getChatHistory = async (req, res) => {
    try {
        const history = await ChatHistory.findOne({ user: req.user._id });
        res.json(history ? history.messages : []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { chat, getChatHistory };
