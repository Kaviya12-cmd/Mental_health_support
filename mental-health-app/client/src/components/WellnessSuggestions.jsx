import { useState, useEffect } from 'react';
import { FaWind, FaMusic, FaPaintBrush, FaCoffee, FaArrowRight } from 'react-icons/fa';

const WellnessSuggestions = ({ setActiveTab }) => {
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('mindease_assessment_history') || '[]');
        const latest = history.length > 0 ? history[history.length - 1] : null;

        const newSuggestions = [];

        if (!latest) {
            newSuggestions.push({
                id: 'assessment',
                title: 'Start your journey',
                text: 'Take your first assessment to unlock personalized wellness tips.',
                icon: <FaArrowRight />,
                action: () => setActiveTab('assessment'),
                color: '#6C63FF'
            });
        } else {
            if (latest.totalScore > 15) {
                newSuggestions.push({
                    id: 'breathing',
                    title: 'Breathe with MindEase',
                    text: 'Your recent check-in suggests a quick 5-min breathing break could help.',
                    icon: <FaWind />,
                    action: () => setActiveTab('breathing'),
                    color: '#00D2D3'
                });
                newSuggestions.push({
                    id: 'relax',
                    title: 'Calming Frequencies',
                    text: 'Listening to nature sounds can help lower your current stress.',
                    icon: <FaMusic />,
                    action: () => setActiveTab('relax'),
                    color: '#FF7675'
                });
            } else {
                newSuggestions.push({
                    id: 'hobbies',
                    title: 'Try a new Hobby',
                    text: 'You are doing well! Engaging in creative painting could boost your mood further.',
                    icon: <FaPaintBrush />,
                    action: () => setActiveTab('hobbies'),
                    color: '#FFB800'
                });
                newSuggestions.push({
                    id: 'break',
                    title: 'Mindful Break',
                    text: 'Treat yourself to a short 10-minute coffee or tea break away from screens.',
                    icon: <FaCoffee />,
                    action: null,
                    color: '#00B894'
                });
            }
        }

        setSuggestions(newSuggestions);
    }, [setActiveTab]);

    return (
        <div style={{ margin: '2rem 0' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '8px', height: '24px', background: 'var(--accent-color)', borderRadius: '4px' }}></div>
                AI Wellness Assistant
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {suggestions.map((s) => (
                    <div
                        key={s.id}
                        className="card glass-panel"
                        style={{
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            borderLeft: `6px solid ${s.color}`,
                            cursor: s.action ? 'pointer' : 'default',
                            transition: 'var(--transition-smooth)'
                        }}
                        onClick={() => s.action && s.action()}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: `${s.color}20`,
                            color: s.color,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            flexShrink: 0
                        }}>
                            {s.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--heading-color)' }}>{s.title}</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--sidebar-text)', lineHeight: '1.4' }}>{s.text}</p>
                        </div>
                        {s.action && <FaArrowRight style={{ opacity: 0.3 }} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WellnessSuggestions;
