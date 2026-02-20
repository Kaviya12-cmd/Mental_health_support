import { useState, useEffect } from 'react';
import { FaPeace, FaClock, FaSync, FaEye, FaLeaf, FaYinYang } from 'react-icons/fa';

const HobbyMeditation = () => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [duration, setDuration] = useState(300); // Default 5 mins
    const [tab, setTab] = useState('meditation'); // 'meditation' or 'yoga'

    useEffect(() => {
        let interval = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        } else if (timer === 0) {
            setIsActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timer]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const yogaPoses = [
        { name: "Child's Pose", benefit: "Calms brain and relieves stress.", img: "https://images.unsplash.com/photo-1544367567-0f2fc100e801?auto=format&fit=crop&w=600&q=80" },
        { name: "Tree Pose", benefit: "Improves focus and balance.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80" },
        { name: "Cat-Cow Stretch", benefit: "Relieves tension in the spine.", img: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=600&q=80" }
    ];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '10px', background: '#F0F3FF', padding: '5px', borderRadius: '14px', width: 'fit-content' }}>
                <button
                    onClick={() => setTab('meditation')}
                    style={{
                        background: tab === 'meditation' ? 'white' : 'transparent',
                        color: tab === 'meditation' ? 'var(--primary-color)' : '#636E72',
                        padding: '10px 20px', borderRadius: '10px', boxShadow: tab === 'meditation' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
                    }}
                >
                    <FaSync /> Meditation
                </button>
                <button
                    onClick={() => setTab('yoga')}
                    style={{
                        background: tab === 'yoga' ? 'white' : 'transparent',
                        color: tab === 'yoga' ? 'var(--primary-color)' : '#636E72',
                        padding: '10px 20px', borderRadius: '10px', boxShadow: tab === 'yoga' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
                    }}
                >
                    <FaLeaf /> Yoga
                </button>
            </div>

            {tab === 'meditation' ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
                        {/* Breathing Circle Logic - Pulse Animation */}
                        <div style={{
                            position: 'absolute', width: '100%', height: '100%',
                            borderRadius: '50%', background: 'rgba(162, 155, 254, 0.1)',
                            animation: 'pulse 6s ease-in-out infinite'
                        }}></div>
                        <div style={{
                            position: 'absolute', width: '70%', height: '70%',
                            borderRadius: '50%', background: 'rgba(162, 155, 254, 0.2)',
                            animation: 'pulse 6s ease-in-out infinite 3s'
                        }}></div>
                        <div style={{ zIndex: 1, color: 'var(--primary-color)', fontSize: '4rem' }}>
                            <FaYinYang style={{ animation: isActive ? 'spin 20s linear infinite' : 'none' }} />
                        </div>
                    </div>

                    <h2 style={{ fontSize: '3rem', margin: '0 0 1rem' }}>{formatTime(timer || duration)}</h2>
                    {!isActive && (
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                            {[60, 300, 600].map(s => (
                                <button key={s} onClick={() => { setDuration(s); setTimer(s); }} style={{ background: duration === s ? 'var(--primary-color)' : 'white', color: duration === s ? 'white' : '#636E72', border: '1px solid #F0F3FF' }}>
                                    {s / 60} min
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => {
                            if (!isActive && timer === 0) setTimer(duration);
                            setIsActive(!isActive);
                        }}
                        style={{
                            padding: '15px 40px', background: isActive ? '#FF7675' : 'var(--primary-color)', color: 'white',
                            borderRadius: '30px', fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        {isActive ? 'Pause Session' : 'Start Meditation'}
                    </button>

                    <p style={{ marginTop: '2rem', color: '#B0BEC5', fontSize: '1.1rem' }}>
                        {isActive ? 'Breathe in... Breathe out...' : 'Select a duration and begin your journey.'}
                    </p>
                </div>
            ) : (
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {yogaPoses.map((pose, i) => (
                        <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <img src={pose.img} alt={pose.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '1.5rem' }}>
                                <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary-color)' }}>{pose.name}</h4>
                                <p style={{ margin: 0, color: '#636E72', fontSize: '0.9rem' }}>{pose.benefit}</p>
                            </div>
                        </div>
                    ))}
                    <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                        <FaEye size={40} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                        <h3>Practice Mindfully</h3>
                        <p style={{ fontSize: '0.9rem', color: '#636E72' }}>Move slowly, listen to your body, and don't push beyond your comfort level.</p>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.3); opacity: 0.3; }
                    100% { transform: scale(1); opacity: 0.1; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default HobbyMeditation;
