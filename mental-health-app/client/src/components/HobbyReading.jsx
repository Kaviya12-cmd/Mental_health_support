import { useState } from 'react';
import { FaMoon, FaSun, FaBookOpen, FaQuoteLeft } from 'react-icons/fa';

const HobbyReading = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const contents = [
        {
            title: "The Power of Small Steps",
            author: "MindEase Wellness Team",
            type: "Wellness Article",
            text: `In a world that often demands radical transformations, we frequently forget the profound impact of tiny, consistent actions. Mental wellness isn't achieved through one grand gesture, but through the accumulation of small, daily choices. 

Choosing to breathe deeply for two minutes when stressed, deciding to write a single line in a journal, or taking a five-minute walk—these are the building blocks of resilience. When we focus on small steps, we remove the paralyzing pressure of "fixing" everything at once. 

Remember: A journey of a thousand miles begins with a single step. Today, what is your one small step?`
        },
        {
            title: "Morning Sunlight & Your Mood",
            author: "Dr. Serene",
            type: "Science & Wellness",
            text: `Exposure to morning sunlight is one of the most effective ways to regulate your circadian rhythm. When natural light hits your retina, it signals your brain to produce serotonin—the "feel-good" hormone. 

Serotonin helps you stay focused, calm, and positive. Furthermore, morning light exposure sets a timer for melatonin production later in the evening, ensuring better sleep quality. Try to spend at least 10 minutes outdoors before 10 AM. Your mind and body will thank you.`
        },
        {
            title: "Accepting Imperfection",
            author: "Wellness Quote",
            type: "Motivational",
            text: `“Ring the bells that still can ring. Forget your perfect offering. There is a crack, a crack in everything. That's how the light gets in.” — Leonard Cohen.

Perfectionism is often the enemy of happiness. Embracing our flaws and the "cracks" in our lives allows us to grow and connect more deeply with others. You don't need to be perfect to be worthy of love and peace. You are enough, just as you are.`
        }
    ];

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: isDarkMode ? '#1a1a2e' : '#FFFFFF',
            color: isDarkMode ? '#e0e0e0' : '#2D3436',
            borderRadius: '24px',
            transition: 'all 0.3s ease'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: isDarkMode ? '1px solid #2d2d4d' : '1px solid #F0F3FF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaBookOpen style={{ color: 'var(--primary-color)' }} />
                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: isDarkMode ? 'white' : 'inherit' }}>Mindful Reading</h3>
                </div>
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    style={{
                        background: isDarkMode ? '#2d2d4d' : '#F0F3FF',
                        color: isDarkMode ? '#FFB800' : '#636E72',
                        padding: '10px',
                        borderRadius: '12px'
                    }}
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                {contents.map((item, index) => (
                    <div key={index} style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', background: 'var(--primary-color)', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>{item.type}</span>
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>by {item.author}</span>
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem', color: isDarkMode ? '#A29BFE' : 'var(--primary-color)' }}>{item.title}</h2>
                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            textAlign: 'justify',
                            whiteSpace: 'pre-line',
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            {item.text}
                        </div>
                        {index !== contents.length - 1 && <hr style={{ marginTop: '3rem', opacity: 0.1 }} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HobbyReading;
