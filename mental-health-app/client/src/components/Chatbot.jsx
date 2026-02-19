import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const Chatbot = () => {
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
                .then(res => setMessages(res.data))
                .catch(err => console.error(err));
        }
        scrollToBottom();
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const [context, setContext] = useState(null); // New state for conversation context

    // ... inside handleSend ...
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');

        try {
            // Send context along with message
            const res = await axios.post('/api/chat', { message: userMsg, context });
            setMessages(prev => [...prev, { sender: 'bot', text: res.data.response }]);
            setContext(res.data.context); // Update context for next turn
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
        }
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    zIndex: 1000
                }}
            >
                {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
            </div>

            {isOpen && (
                <div
                    className="fade-in"
                    style={{
                        position: 'fixed',
                        bottom: '90px',
                        right: '20px',
                        width: '350px',
                        height: '500px',
                        background: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 5px 25px rgba(0,0,0,0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        zIndex: 1000
                    }}
                >
                    <div style={{ padding: '15px', background: 'var(--primary-color)', color: 'white' }}>
                        <h3>MindEase Bot</h3>
                    </div>

                    <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    background: msg.sender === 'user' ? 'var(--secondary-color)' : '#f1f1f1',
                                    color: msg.sender === 'user' ? 'var(--primary-color)' : 'black',
                                    padding: '10px 15px',
                                    borderRadius: '12px',
                                    maxWidth: '80%'
                                }}
                            >
                                {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                                    part.match(/^https?:\/\//) ? (
                                        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: msg.sender === 'user' ? 'white' : 'var(--primary-color)', textDecoration: 'underline' }}>{part}</a>
                                    ) : (
                                        <span key={i}>{part}</span>
                                    )
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #eee' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Share how you're feeling..."
                            style={{ border: 'none', borderRadius: 0, margin: 0, padding: '15px' }}
                        />
                        <button type="submit" style={{ borderRadius: 0, background: 'white', color: 'var(--primary-color)' }}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Chatbot;
