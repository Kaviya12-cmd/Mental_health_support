import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRobot, FaPaperPlane, FaTimes, FaCircle, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Chatbot = () => {
    const { user } = useAuth();
    const displayName = user?.name || 'User';

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Fetch history
            axios.get('/api/chat')
                .then(res => {
                    if (res.data.length === 0) {
                        setMessages([{ sender: 'bot', text: `Hello ${displayName}! I'm here for you today. How are you feeling?` }]);
                    } else {
                        setMessages(res.data);
                    }
                })
                .catch(err => {
                    setMessages([{ sender: 'bot', text: `Hello ${displayName}! I'm here for you today. How are you feeling?` }]);
                });
        }
        scrollToBottom();
    }, [isOpen]);

    const [context, setContext] = useState(null);
    const [speaking, setSpeaking] = useState(null); // stores index of speaking message

    const speak = (text, idx) => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.1; // Slightly higher for empathy
        utterance.rate = 0.9;  // Slower for calm

        utterance.onend = () => setSpeaking(null);
        utterance.onerror = () => setSpeaking(null);

        setSpeaking(idx);
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeak = () => {
        window.speechSynthesis.cancel();
        setSpeaking(null);
    };

    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState(['I feel stressed', 'Tell me a joke', 'Help me relax', 'I am bored']);

    const handleSend = async (e, customMsg = null) => {
        if (e) e.preventDefault();
        const userMsg = customMsg || input;
        if (!userMsg.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        try {
            const res = await axios.post('/api/chat', { message: userMsg, context });
            let botReply = res.data.response;

            // Emoji & Mood Logic (Frontend Enhancement)
            const moodPatterns = {
                stress: /stress|anxious|anxiety|worried|pressure/i,
                sad: /sad|depressed|unhappy|lonely|cry/i,
                bored: /bored|nothing to do|boring/i,
                happy: /happy|good|great|awesome/i
            };

            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything! 😂",
                "I told my computer I needed a break, and now it won't stop sending me KitKat ads. 🍫",
                "Even Wi-Fi disconnects sometimes... we just reconnect and keep going! 😊",
                "My plant died because I didn't talk to it enough. Now I'm practicing on you! (Just kidding, you're much more interesting) 🌿"
            ];

            if (moodPatterns.stress.test(userMsg)) {
                botReply = "I'm here for you 🤍. I can tell you're feeling a bit overwhelmed. " + botReply;
                setSuggestions(['Try Breathing Exercise', 'Listen to Music', 'Journaling']);
            } else if (moodPatterns.sad.test(userMsg)) {
                botReply = "Sending you a virtual hug 🫂. It's okay to feel this way. " + botReply;
                setSuggestions(['Motivational Quote', 'Talk more', 'Relaxing Hobbies']);
            } else if (moodPatterns.bored.test(userMsg)) {
                botReply = "Let's fix that! Boredom is just your brain's way of asking for an adventure. 🎨 " + botReply;
                setSuggestions(['Photography', 'Painting', 'Reading']);
            } else if (userMsg.toLowerCase().includes('joke')) {
                botReply = jokes[Math.floor(Math.random() * jokes.length)];
                setSuggestions(['Tell another', 'I feel better', 'Let\'s talk']);
            } else {
                setSuggestions(['I feel stressed', 'Help me relax', 'Tell me a joke']);
            }

            // Occasionally address the user by name (30% chance)
            if (Math.random() > 0.7 && displayName !== 'User') {
                const prefixes = [`${displayName}, `, `I'm here for you, ${displayName}. `, `That's a good point, ${displayName}. `];
                const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                botReply = prefix + botReply.charAt(0).toLowerCase() + botReply.slice(1);
            }

            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
                setContext(res.data.context);
                setIsTyping(false);
            }, 1000); // Simulate human thinking
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
            setIsTyping(false);
        }
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 12px 30px rgba(108, 99, 255, 0.4)',
                    zIndex: 1000,
                    transition: 'var(--transition-smooth)',
                    border: '4px solid white',
                    overflow: 'visible'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
            >
                {isOpen ? <FaTimes size={28} /> : (
                    <div style={{ position: 'relative' }}>
                        <FaRobot size={32} />
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '18px',
                            height: '18px',
                            background: '#00B894',
                            borderRadius: '50%',
                            border: '3px solid white',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}></span>
                    </div>
                )}
            </div>

            {isOpen && (
                <div
                    className="fade-in"
                    style={{
                        position: 'fixed',
                        bottom: '130px',
                        right: '40px',
                        width: '420px',
                        height: '700px',
                        maxHeight: '85vh',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '35px',
                        boxShadow: '0 30px 80px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 1000,
                        border: '1px solid rgba(255,255,255,0.8)'
                    }}
                >
                    <div style={{
                        padding: '25px',
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                            <FaRobot size={28} />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'white', fontWeight: '800' }}>MindEase Companion</h3>
                            <div style={{ fontSize: '0.85rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                                <FaCircle size={10} color="#00B894" className="pulse" /> Live Support
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: '#F8F9FF' }}>
                        {messages.length === 0 && (
                            <div style={{ textAlign: 'center', color: 'var(--sidebar-text)', marginTop: '80px', padding: '0 2rem' }}>
                                <div style={{
                                    width: '80px', height: '80px', background: '#F0F3FF', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                                    color: 'var(--primary-color)'
                                }}>
                                    <FaRobot size={40} />
                                </div>
                                <h4 style={{ color: 'var(--heading-color)', fontSize: '1.2rem', marginBottom: '10px' }}>Hello there!</h4>
                                <p style={{ lineHeight: '1.6' }}>I'm your AI wellness companion. Whatever is on your mind, I'm here to support you. How are you feeling today?</p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    background: msg.sender === 'user' ? 'var(--primary-color)' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'var(--text-color)',
                                    padding: '16px 20px',
                                    borderRadius: msg.sender === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                                    maxWidth: '85%',
                                    boxShadow: msg.sender === 'bot' ? '0 10px 20px rgba(0,0,0,0.05)' : '0 10px 20px rgba(108, 99, 255, 0.15)',
                                    fontSize: '1.05rem',
                                    lineHeight: '1.6',
                                    border: msg.sender === 'bot' ? '1px solid #F0F3FF' : 'none',
                                    position: 'relative'
                                }}
                            >
                                {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                                    part.match(/^https?:\/\//) ? (
                                        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: msg.sender === 'user' ? 'white' : 'var(--primary-color)', textDecoration: 'underline', fontWeight: '700' }}>{part}</a>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    )
                                )}

                                {msg.sender === 'bot' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            speaking === idx ? stopSpeak() : speak(msg.text, idx);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            bottom: '5px',
                                            right: '-45px',
                                            background: 'white',
                                            color: speaking === idx ? 'var(--primary-color)' : '#B0BEC5',
                                            width: '35px',
                                            height: '35px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                            border: '1px solid #F0F3FF'
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>
                                            {speaking === idx ? '🔇' : '🔊'}
                                        </span>
                                    </button>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div style={{ alignSelf: 'flex-start', background: 'white', padding: '12px 20px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                                <div className="typing-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestion Buttons */}
                    <div style={{ display: 'flex', gap: '8px', padding: '10px 25px', overflowX: 'auto', background: '#F8F9FF', whiteSpace: 'nowrap', borderTop: '1px solid #F0F3FF' }}>
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(null, s)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    background: 'white',
                                    color: 'var(--primary-color)',
                                    border: '1px solid var(--primary-color)',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                    cursor: 'pointer'
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSend} style={{ display: 'flex', padding: '20px 25px', background: 'white' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                border: '2px solid #F0F3FF',
                                background: '#F8FBFF',
                                borderRadius: '18px',
                                padding: '14px 22px',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                marginLeft: '12px',
                                width: '54px',
                                height: '54px',
                                borderRadius: '18px',
                                background: 'var(--primary-color)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px rgba(108, 99, 255, 0.2)'
                            }}
                        >
                            <FaPaperPlane size={20} />
                        </button>
                    </form>
                </div>
            )}
            <style>{`
                .typing-dots { display: flex; gap: 4px; padding: 4px 0; }
                .typing-dots span { width: 8px; height: 8px; background: #6C63FF; borderRadius: 50%; opacity: 0.4; animation: dots 1.4s infinite; }
                .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
                .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes dots { 0%, 100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
                .pulse { animation: pulse-ring 1.5s infinite; }
                @keyframes pulse-ring { 0% { transform: scale(0.9); opacity: 0.7; } 50% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } }
            `}</style>
        </>
    );
};

export default Chatbot;

