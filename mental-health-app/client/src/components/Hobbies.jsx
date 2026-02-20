import { useState } from 'react';
import { FaPalette, FaMusic, FaLeaf, FaBookOpen, FaCamera, FaPeace, FaPenFancy, FaYarn, FaDumbbell, FaSun, FaTimes, FaCheckCircle, FaHeart } from 'react-icons/fa';
import HobbyPainting from './HobbyPainting';
import HobbyJournaling from './HobbyJournaling';
import HobbyReading from './HobbyReading';
import HobbyMusic from './HobbyMusic';
import HobbyMeditation from './HobbyMeditation';
import HobbyPhotography from './HobbyPhotography';

const Hobbies = () => {
    const [activeHobby, setActiveHobby] = useState(null);
    const [tracker, setTracker] = useState(JSON.parse(localStorage.getItem('hobby_tracker') || '{}'));

    const hobbies = [
        {
            id: 'painting',
            name: 'Painting',
            icon: <FaPalette />,
            color: '#FF7675',
            benefit: 'Color therapy reduces stress & boosts creativity.',
            img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
            component: <HobbyPainting />
        },
        {
            id: 'journaling',
            name: 'Journaling',
            icon: <FaPenFancy />,
            color: '#6C63FF',
            benefit: 'Externalizing thoughts clarifies the mind.',
            img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
            component: <HobbyJournaling />
        },
        {
            id: 'reading',
            name: 'Reading',
            icon: <FaBookOpen />,
            color: '#FAB1A0',
            benefit: 'Escapism & cognitive stimulation.',
            img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
            component: <HobbyReading />
        },
        {
            id: 'meditation',
            name: 'Meditation & Yoga',
            icon: <FaPeace />,
            color: '#A29BFE',
            benefit: 'Improves focus & emotional regulation.',
            img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
            component: <HobbyMeditation />
        },
        {
            id: 'music',
            name: 'Calm Music',
            icon: <FaMusic />,
            color: '#0984E3',
            benefit: 'Direct impact on neurochemistry & mood.',
            img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
            component: <HobbyMusic />
        },
        {
            id: 'photography',
            name: 'Photography',
            icon: <FaCamera />,
            color: '#00B894',
            benefit: 'Encourages mindfulness & seeing beauty.',
            img: 'https://images.unsplash.com/photo-1452784444945-3f422708362?auto=format&fit=crop&w=800&q=80',
            component: <HobbyPhotography />
        }
    ];

    const updateStatus = (hobbyId, status) => {
        const newTracker = { ...tracker, [hobbyId]: status };
        setTracker(newTracker);
        localStorage.setItem('hobby_tracker', JSON.stringify(newTracker));

        // Track hobby participation for dashboard
        const history = JSON.parse(localStorage.getItem('mindease_assessment_history') || '[]');
        if (history.length > 0) {
            const last = history[history.length - 1];
            last.hobbyCount = (last.hobbyCount || 0) + 1;
            localStorage.setItem('mindease_assessment_history', JSON.stringify(history));
        }
    };

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ color: 'var(--heading-color)', marginBottom: '0.75rem', fontSize: '2.5rem', fontWeight: '800' }}>Wellness Hobbies</h2>
                <p style={{ color: 'var(--sidebar-text)', fontSize: '1.2rem' }}>Engage your senses and find joy in the process.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {hobbies.map(hobby => (
                    <div
                        key={hobby.id}
                        className="card"
                        style={{
                            padding: 0,
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'var(--transition-smooth)'
                        }}
                        onClick={() => setActiveHobby(hobby)}
                    >
                        <div style={{ height: '180px', overflow: 'hidden' }}>
                            <img src={hobby.img} alt={hobby.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ color: hobby.color, fontSize: '1.2rem' }}>{hobby.icon}</div>
                                <h3 style={{ fontSize: '1.25rem' }}>{hobby.name}</h3>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--sidebar-text)', marginBottom: '1.25rem', height: '3rem', overflow: 'hidden' }}>{hobby.benefit}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button style={{ padding: '8px 16px', fontSize: '0.85rem', background: 'var(--primary-color)', color: 'white' }}>Try Now</button>
                                {tracker[hobby.id] === 'completed' && <FaCheckCircle color="var(--success-color)" size={20} />}
                                {tracker[hobby.id] === 'liked' && <FaHeart color="#FF7675" size={20} />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {activeHobby && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setActiveHobby(null)}>
                    <div
                        className="fade-in"
                        style={{
                            background: 'white',
                            maxWidth: activeHobby.component ? '1000px' : '600px',
                            width: '100%',
                            maxHeight: '90vh',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #F0F3FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ color: activeHobby.color, fontSize: '1.5rem' }}>{activeHobby.icon}</div>
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{activeHobby.name}</h2>
                            </div>
                            <button
                                onClick={() => setActiveHobby(null)}
                                style={{
                                    background: '#F0F3FF', color: 'black', width: '36px', height: '36px',
                                    borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
                            <div style={{
                                background: 'rgba(108, 99, 255, 0.05)',
                                borderLeft: '4px solid var(--primary-color)',
                                padding: '15px 20px',
                                borderRadius: '0 12px 12px 0',
                                marginBottom: '2rem'
                            }}>
                                <h4 style={{ margin: '0 0 5px', fontSize: '0.9rem', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>Wellness Impact</h4>
                                <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--heading-color)', fontWeight: '500' }}>{activeHobby.benefit}</p>
                            </div>

                            {activeHobby.component ? (
                                <div style={{ minHeight: '400px' }}>
                                    {activeHobby.component}
                                </div>
                            ) : (
                                <>
                                    <div style={{ height: '250px', borderRadius: '20px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                        <img src={activeHobby.img} alt={activeHobby.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <p style={{ fontSize: '1.1rem', color: '#636E72', marginBottom: '2rem', lineHeight: '1.6' }}>{activeHobby.guidance}</p>
                                </>
                            )}

                            <div style={{ borderTop: '1px solid #F0F3FF', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FaCheckCircle color="var(--primary-color)" /> Track your engagement:
                                </h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {['tried', 'liked', 'completed'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(activeHobby.id, status)}
                                            style={{
                                                flex: 1,
                                                padding: '12px',
                                                borderRadius: '12px',
                                                fontSize: '0.9rem',
                                                background: tracker[activeHobby.id] === status ? activeHobby.color : '#F8FBFF',
                                                color: tracker[activeHobby.id] === status ? 'white' : '#636E72',
                                                border: tracker[activeHobby.id] === status ? 'none' : '1px solid #EEE'
                                            }}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hobbies;
