import { useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeadphones, FaMusic, FaVolumeUp } from 'react-icons/fa';

const HobbyMusic = () => {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const playlist = [
        {
            title: "Morning Zen",
            artist: "Nature Sounds",
            duration: "5:20",
            img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
            color: "#00D2D3"
        },
        {
            title: "Deep Focus",
            artist: "Lofi Beats",
            duration: "4:45",
            img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80",
            color: "#6C63FF"
        },
        {
            title: "Ocean Waves",
            artist: "Relaxation Oasis",
            duration: "10:00",
            img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
            color: "#0984E3"
        },
        {
            title: "Forest Rain",
            artist: "Ambient Dreams",
            duration: "8:15",
            img: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=400&q=80",
            color: "#00B894"
        }
    ];

    const track = playlist[currentTrack];

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '1.5rem', borderBottom: '1px solid #F0F3FF' }}>
                <div style={{ width: '50px', height: '50px', background: 'rgba(9, 132, 227, 0.1)', color: '#0984E3', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    <FaMusic />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Calm Player</h3>
                    <p style={{ margin: 0, color: '#636E72', fontSize: '0.9rem' }}>Curated frequencies for mental clarity.</p>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
                {/* Vinyl/Image Art */}
                <div style={{ position: 'relative', width: '280px', height: '280px' }}>
                    <div style={{
                        width: '100%', height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        border: '8px solid white',
                        animation: isPlaying ? 'spin 12s linear infinite' : 'none'
                    }}>
                        <img src={track.img} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '60px', height: '60px', borderRadius: '50%', background: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#F0F3FF' }}></div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: track.color }}>{track.title}</h2>
                    <p style={{ fontSize: '1.2rem', color: '#636E72', marginBottom: '2.5rem' }}>{track.artist}</p>

                    {/* Progress Bar Mock */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{ width: '100%', height: '6px', background: '#F0F3FF', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ width: isPlaying ? '35%' : '10%', height: '100%', background: track.color, transition: 'width 2s ease' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.85rem', color: '#B0BEC5' }}>
                            <span>0:45</span>
                            <span>{track.duration}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                        <button
                            onClick={() => setCurrentTrack((prev) => (prev > 0 ? prev - 1 : playlist.length - 1))}
                            style={{ background: 'transparent', color: '#A29BFE', fontSize: '1.5rem', padding: '10px' }}
                        >
                            <FaStepBackward />
                        </button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: track.color, color: 'white',
                                fontSize: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 10px 20px ${track.color}40`,
                                transition: 'transform 0.2s ease'
                            }}
                        >
                            {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '5px' }} />}
                        </button>
                        <button
                            onClick={() => setCurrentTrack((prev) => (prev < playlist.length - 1 ? prev + 1 : 0))}
                            style={{ background: 'transparent', color: '#A29BFE', fontSize: '1.5rem', padding: '10px' }}
                        >
                            <FaStepForward />
                        </button>
                    </div>

                    <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#B0BEC5' }}>
                        <FaVolumeUp />
                        <div style={{ width: '80px', height: '4px', background: '#F0F3FF', borderRadius: '2px' }}>
                            <div style={{ width: '70%', height: '100%', background: '#B0BEC5', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mini Playlist */}
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '10px' }}>
                {playlist.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentTrack(index)}
                        style={{
                            flexShrink: 0, width: '120px', cursor: 'pointer',
                            opacity: currentTrack === index ? 1 : 0.6,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <img src={item.img} alt={item.title} style={{ width: '100%', height: '80px', borderRadius: '12px', objectFit: 'cover', marginBottom: '8px', border: currentTrack === index ? `2px solid ${item.color}` : 'none' }} />
                        <h5 style={{ margin: 0, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h5>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default HobbyMusic;
