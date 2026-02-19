import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMusic, FaGamepad, FaLightbulb, FaSearch, FaPlay } from 'react-icons/fa';

const Relax = () => {
    const [subTab, setSubTab] = useState('flashcards');

    return (
        <div className="fade-in">
            <h2>Relax Zone</h2>
            <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                <button
                    onClick={() => setSubTab('flashcards')}
                    style={{ background: subTab === 'flashcards' ? 'var(--primary-color)' : 'white', color: subTab === 'flashcards' ? 'white' : 'black', border: '1px solid #ddd' }}
                >
                    <FaLightbulb /> Flashcards
                </button>
                <button
                    onClick={() => setSubTab('music')}
                    style={{ background: subTab === 'music' ? 'var(--primary-color)' : 'white', color: subTab === 'music' ? 'white' : 'black', border: '1px solid #ddd' }}
                >
                    <FaMusic /> Music
                </button>
                <button
                    onClick={() => setSubTab('games')}
                    style={{ background: subTab === 'games' ? 'var(--primary-color)' : 'white', color: subTab === 'games' ? 'white' : 'black', border: '1px solid #ddd' }}
                >
                    <FaGamepad /> Games
                </button>
            </div>

            <div className="card">
                {subTab === 'flashcards' && <Flashcards />}
                {subTab === 'music' && <Music />}
                {subTab === 'games' && <Games />}
            </div>
        </div>
    );
};

const Flashcards = () => {
    const cards = [
        "You are capable of amazing things.",
        "Take a deep breath. You got this.",
        "One step at a time.",
        "Your feelings are valid.",
        "Focus on what you can control.",
        "It's okay to rest.",
        "You are loved.",
        "This too shall pass."
    ];

    const [currentCard, setCurrentCard] = useState(0);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        axios.get('/api/relax/flashcards/points')
            .then(res => setPoints(res.data.points))
            .catch(err => console.error(err));
    }, []);

    const nextCard = async () => {
        const next = (currentCard + 1) % cards.length;
        setCurrentCard(next);

        try {
            const res = await axios.post('/api/relax/flashcards/points', { points: 5 });
            setPoints(res.data.points);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ color: 'var(--success-color)' }}>Points: {points}</h3>
            <div
                style={{
                    background: 'linear-gradient(135deg, #ab47bc 0%, #7b1fa2 100%)',
                    color: 'white',
                    padding: '3rem',
                    borderRadius: '16px',
                    fontSize: '1.5rem',
                    margin: '2rem 0',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
            >
                {cards[currentCard]}
            </div>
            <button
                onClick={nextCard}
                style={{ background: 'var(--primary-color)', color: 'white' }}
            >
                Next Card (+5 Points)
            </button>
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
            setError("Failed to search tracks. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Find Your Tune</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Search for a song, artist, or mood to play directly.
            </p>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Search songs (e.g., Lofi Chill, Mozart)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    style={{ flex: 1 }}
                />
                <button type="submit" style={{ background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center' }}>
                    <FaSearch style={{ marginRight: '5px' }} /> Search
                </button>
            </form>

            {error && (
                <div style={{ marginTop: '1rem', padding: '10px', background: '#ffebee', color: '#c62828', borderRadius: '8px' }}>
                    {error}
                </div>
            )}

            {loading && <p style={{ marginTop: '1rem' }}>Searching...</p>}

            {currentTrack && (
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '12px' }}>
                    <h4>Now Playing: {currentTrack.name}</h4>
                    <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '12px' }}
                    ></iframe>
                    <button
                        onClick={() => setCurrentTrack(null)}
                        style={{ marginTop: '10px', background: 'transparent', color: '#666', textDecoration: 'underline' }}
                    >
                        Close Player
                    </button>
                </div>
            )}

            <div style={{ marginTop: '2rem', display: 'grid', gap: '10px' }}>
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        onClick={() => setCurrentTrack(track)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                            background: 'white',
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f9f9f9'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                    >
                        {track.image && <img src={track.image} alt={track.album} style={{ width: '50px', height: '50px', borderRadius: '4px', marginRight: '15px' }} />}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold' }}>{track.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{track.artist} • {track.album}</div>
                        </div>
                        <FaPlay style={{ color: 'var(--primary-color)' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Games = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>Take a Break with Games</h3>
            <p>Playing games can help reduce stress and anxiety.</p>
            <a
                href="https://poki.com"
                target="_blank"
                rel="noreferrer"
                style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    background: '#ff4081',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    marginTop: '20px'
                }}
            >
                Play Games on Poki
            </a>
        </div>
    );
};

export default Relax;
