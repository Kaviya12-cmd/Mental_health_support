import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMusic, FaGamepad, FaLightbulb, FaSearch, FaPlay, FaStar, FaTimes } from 'react-icons/fa';

const Relax = () => {
    const [subTab, setSubTab] = useState('flashcards');

    const tabs = [
        { id: 'flashcards', icon: <FaLightbulb />, label: 'Wisdom' },
        { id: 'music', icon: <FaMusic />, label: 'Soothing' },
        { id: 'games', icon: <FaGamepad />, label: 'Play' }
    ];

    return (
        <div className="relax-zone-premium fade-in" style={{ padding: '1rem' }}>
            {/* Minimalist Header */}
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--heading-color)', fontSize: '3.2rem', fontWeight: '200', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '1rem' }}>Relax Zone</h2>
                <div style={{ width: '60px', height: '2px', background: 'var(--primary-color)', margin: '0 auto 1.5rem', opacity: 0.5 }}></div>
                <p style={{ color: 'var(--sidebar-text)', fontSize: '1.1rem', letterSpacing: '1px', fontWeight: '300' }}>YOUR SANCTUARY FOR MENTAL CLARITY</p>
            </div>

            {/* High-End Tab Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2.5rem',
                marginBottom: '4rem'
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        style={{
                            background: 'transparent',
                            color: subTab === tab.id ? 'var(--primary-color)' : 'var(--sidebar-text)',
                            border: 'none',
                            borderBottom: `2px solid ${subTab === tab.id ? 'var(--primary-color)' : 'transparent'}`,
                            padding: '15px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.4s ease',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            opacity: subTab === tab.id ? 1 : 0.5
                        }}
                    >
                        <span style={{ fontSize: '1.5rem' }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div style={{
                minHeight: '600px',
                borderRadius: '40px',
                position: 'relative',
                overflow: 'visible'
            }}>
                {subTab === 'flashcards' && <Flashcards />}
                {subTab === 'music' && <Music />}
                {subTab === 'games' && <Games />}
            </div>
        </div>
    );
};

const Flashcards = () => {
    const cards = [
        { text: "Small steps are still progress. Keep going.", img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=80" },
        { text: "You are enough exactly as you are today.", img: "https://images.unsplash.com/photo-1490730141103-6ca3d7d8caaf?auto=format&fit=crop&w=1600&q=80" },
        { text: "This feeling is temporary. You are resilient.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80" },
        { text: "Breathe in peace, breathe out tension.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80" },
        { text: "Your hard work is paying off, even if you don't see it yet.", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80" },
        { text: "Focus on the beauty of the present moment.", img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=80" }
    ];

    const [currentCard, setCurrentCard] = useState(0);
    const [points, setPoints] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        axios.get('/api/relax/flashcards/points')
            .then(res => setPoints(res.data.points))
            .catch(err => console.error(err));
    }, []);

    const nextCard = async () => {
        setIsTransitioning(true);
        setTimeout(async () => {
            const next = (currentCard + 1) % cards.length;
            setCurrentCard(next);
            setIsTransitioning(false);

            try {
                const res = await axios.post('/api/relax/flashcards/points', { points: 5 });
                setPoints(res.data.points);
            } catch (error) {
                console.error(error);
            }
        }, 600);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {/* Premium Points Badge */}
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '50px',
                fontWeight: '900',
                marginBottom: '4rem',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                boxShadow: '0 15px 30px rgba(255, 160, 0, 0.25)',
                textTransform: 'uppercase'
            }}>
                <FaStar style={{ marginRight: '10px' }} /> Level: {Math.floor(points / 50) + 1} • {points} Points
            </div>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '850px',
                    height: '550px',
                    margin: '0 auto 4rem',
                    borderRadius: '50px',
                    overflow: 'hidden',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.15)',
                    background: '#2D3748',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isTransitioning ? 'scale(0.98) translateY(10px)' : 'scale(1) translateY(0)',
                    opacity: isTransitioning ? 0.7 : 1
                }}
            >
                {/* Background Image with key to force fresh fade */}
                <img
                    key={cards[currentCard].img}
                    src={cards[currentCard].img}
                    alt="Background"
                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', animation: 'fade-in 0.8s ease-out' }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                    zIndex: 1
                }}></div>

                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem',
                    color: 'white'
                }}>
                    <div style={{ position: 'absolute', top: '50px', opacity: 0.7, fontSize: '0.75rem', letterSpacing: '6px', fontWeight: '800' }}>DAILY WISDOM</div>

                    <FaLightbulb size={45} style={{ marginBottom: '2.5rem', color: '#FFD700', filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.4))' }} />
                    <h3 style={{
                        fontSize: '2.4rem',
                        fontWeight: '300',
                        lineHeight: '1.5',
                        maxWidth: '650px',
                        letterSpacing: '0.5px'
                    }}>
                        "{cards[currentCard].text}"
                    </h3>

                    <div style={{ position: 'absolute', bottom: '50px', opacity: 0.5, fontSize: '0.7rem', letterSpacing: '2px' }}>
                        {currentCard + 1} / {cards.length}
                    </div>
                </div>
            </div>

            <button
                onClick={nextCard}
                disabled={isTransitioning}
                style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '22px 60px',
                    fontSize: '1rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontWeight: '800',
                    boxShadow: '0 20px 40px rgba(108, 99, 255, 0.25)',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.4s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
                Seek More Wisdom
            </button>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(1.05); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

const Music = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setTracks([]);

        try {
            const res = await axios.post('/api/relax/music/search', { query });
            if (res.data.source === 'manual') {
                setError(res.data.message);
            } else {
                setTracks(res.data.tracks);
            }
        } catch (error) {
            console.error(error);
            setError("Failed to curate tracks. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="music-sanctuary">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: '200', letterSpacing: '4px', textTransform: 'uppercase' }}>Musical Sanctuary</h3>
                <p style={{ color: 'var(--sidebar-text)', opacity: 0.7, letterSpacing: '1px' }}>Curated frequencies for deep relaxation.</p>
            </div>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0', maxWidth: '700px', margin: '0 auto 4rem', background: 'white', borderRadius: '50px', padding: '8px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid #F0F3FF' }}>
                <input
                    type="text"
                    placeholder="Find your frequency (e.g. Zen, Rainfall, Lo-fi)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    style={{
                        flex: 1,
                        padding: '15px 30px',
                        border: 'none',
                        background: 'transparent',
                        fontSize: '1rem',
                        outline: 'none',
                        letterSpacing: '0.5px'
                    }}
                />
                <button type="submit" style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '50px',
                    padding: '0 40px',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: 'none'
                }}>
                    CURATE
                </button>
            </form>

            {error && (
                <div className="fade-in" style={{ margin: '2rem auto', maxWidth: '500px', padding: '15px', background: 'rgba(255, 118, 117, 0.05)', color: '#FF7675', borderRadius: '15px', textAlign: 'center', fontSize: '0.9rem' }}>
                    {error}
                </div>
            )}

            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="loading-spinner" style={{ width: '30px', height: '30px', border: '2px solid rgba(0,0,0,0.05)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                </div>
            )}

            {currentTrack && (
                <div className="fade-in" style={{ marginBottom: '4rem', padding: '1rem', background: 'white', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.1)', border: '1px solid #F0F3FF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ background: 'var(--primary-color)', padding: '12px', borderRadius: '15px', color: 'white', display: 'flex' }}>
                                <FaPlay size={18} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{currentTrack.name}</h4>
                                <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Now Playing</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setCurrentTrack(null)}
                            style={{ background: '#F7FAFC', border: 'none', color: '#666', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div style={{ borderRadius: '30px', overflow: 'hidden', height: '450px' }}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1`}
                            title="Audio Environment"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        onClick={() => setCurrentTrack(track)}
                        style={{
                            padding: '1rem',
                            background: 'white',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            border: '1px solid #F0F3FF'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ position: 'relative', marginBottom: '1.2rem', borderRadius: '22px', overflow: 'hidden', aspectRatio: '1', background: '#F7FAFC' }}>
                            {track.image ? (
                                <img src={track.image} alt={track.album} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #A0AEC0, #CBD5E0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaMusic size={40} color="white" />
                                </div>
                            )}
                            <div style={{
                                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: '0.3s'
                            }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0}>
                                <div style={{ background: 'white', padding: '15px', borderRadius: '50%', color: 'var(--primary-color)', display: 'flex' }}>
                                    <FaPlay size={20} />
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0 0.5rem' }}>
                            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#1A202C', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.name}</div>
                            <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: '500' }}>{track.artist}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Games = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto 4rem' }}>
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80"
                        alt="Mindful Play"
                        style={{
                            borderRadius: '50px',
                            boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
                            width: '100%',
                            height: '500px',
                            objectFit: 'cover'
                        }}
                    />
                    {/* Floating Decorative Elements */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(20px)',
                        padding: '25px 40px',
                        borderRadius: '30px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        width: 'max-content'
                    }}>
                        <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #EC407A, #D81B60)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(216, 27, 96, 0.2)' }}>
                            <FaGamepad size={30} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.5px' }}>Mindful Play</h4>
                            <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '0.9rem', fontWeight: '500' }}>Cognitive Stress Relief</p>
                        </div>
                    </div>
                </div>

                <h3 style={{ fontSize: '2.8rem', fontWeight: '200', letterSpacing: '2px', color: 'var(--heading-color)', marginBottom: '2rem' }}>BREAK THE CYCLE</h3>
                <p style={{ maxWidth: '700px', margin: '0 auto 4rem', color: 'var(--sidebar-text)', fontSize: '1.2rem', lineHeight: '1.8', fontWeight: '300', opacity: 0.8 }}>
                    Engaging in immersive, flow-state gaming can effectively lower cortisol levels and reset your neurological stress response.
                </p>
            </div>

            <a
                href="https://poki.com"
                target="_blank"
                rel="noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '25px 70px',
                    background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '25px',
                    fontSize: '1.1rem',
                    fontWeight: '800',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transition: 'all 0.4s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
                Start Session
            </a>

            <p style={{ marginTop: '3rem', color: '#A0AEC0', fontSize: '0.85rem', letterSpacing: '1px' }}>
                POWERED BY POKI MINDFULNESS COLLECTION
            </p>
        </div>
    );
};


export default Relax;

