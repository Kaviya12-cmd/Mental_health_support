import React, { useState } from 'react';
import { FaHeart, FaEye, FaChevronLeft, FaChevronRight, FaTimes, FaCameraRetro, FaLeaf } from 'react-icons/fa';

const HobbyPhotography = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [liked, setLiked] = useState({});

    const photos = [
        {
            id: 1, category: 'Nature',
            url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
            quote: 'Nature is not a place to visit. It is home.'
        },
        {
            id: 2, category: 'Mountains',
            url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
            quote: 'The mountains are the beginning and the end of all natural scenery.'
        },
        {
            id: 3, category: 'Beaches',
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            quote: 'To escape and sit quietly on the beach — that’s my idea of paradise.'
        },
        {
            id: 4, category: 'Wildlife',
            url: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
            quote: 'Look deep into nature, and then you will understand everything better.'
        },
        {
            id: 5, category: 'Sunsets',
            url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
            quote: 'Sunsets are proof that no matter what happens, every day can end beautifully.'
        },
        {
            id: 6, category: 'Flowers',
            url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
            quote: 'Where flowers bloom so does hope.'
        }
    ];

    const openPreview = (idx) => {
        setCurrentIndex(idx);
        setSelectedImage(photos[idx]);
    };

    const nextImage = () => {
        const nextIdx = (currentIndex + 1) % photos.length;
        setCurrentIndex(nextIdx);
        setSelectedImage(photos[nextIdx]);
    };

    const prevImage = () => {
        const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
        setCurrentIndex(prevIdx);
        setSelectedImage(photos[prevIdx]);
    };

    const toggleLike = (id) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #F0F3FF', paddingBottom: '1.5rem' }}>
                <div style={{ background: '#E8F5E9', padding: '12px', borderRadius: '15px', color: '#2E7D32' }}>
                    <FaCameraRetro size={24} />
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#1A202C' }}>Mindful Lens</h3>
                    <p style={{ margin: 0, color: '#718096', fontSize: '1rem' }}>Explore the beauty of the present moment.</p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem',
                flex: 1
            }}>
                {photos.map((photo, index) => (
                    <div
                        key={photo.id}
                        onClick={() => openPreview(index)}
                        style={{
                            position: 'relative', borderRadius: '25px', overflow: 'hidden',
                            cursor: 'pointer', aspectRatio: '4/3', border: '1px solid #EDF2F7',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                        className="photo-card"
                    >
                        <img
                            src={photo.url}
                            alt={photo.category}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                            className="preview-img"
                        />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                            display: 'flex', alignItems: 'flex-end', padding: '20px', color: 'white'
                        }}>
                            <div>
                                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', backdropFilter: 'blur(5px)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '1px' }}>
                                    {photo.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 2000,
                    background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'zoomIn 0.3s ease-out'
                }}>
                    <button
                        onClick={() => setSelectedImage(null)}
                        style={{ position: 'absolute', top: '40px', right: '40px', background: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}
                    >
                        <FaTimes size={20} />
                    </button>

                    <button onClick={prevImage} style={{ position: 'absolute', left: '40px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer' }}>
                        <FaChevronLeft size={24} />
                    </button>

                    <div style={{ maxWidth: '90%', textAlign: 'center' }}>
                        <img src={selectedImage.url} alt={selectedImage.category} style={{ maxHeight: '75vh', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', marginBottom: '2rem' }} />
                        <h4 style={{ color: 'white', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: '300', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>"{selectedImage.quote}"</h4>
                        <button
                            onClick={() => toggleLike(selectedImage.id)}
                            style={{
                                marginTop: '2rem', padding: '15px 40px', borderRadius: '30px',
                                background: liked[selectedImage.id] ? '#FF7675' : 'white',
                                color: liked[selectedImage.id] ? 'white' : 'black',
                                border: 'none', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer',
                                display: 'inline-flex', alignItems: 'center', gap: '10px'
                            }}
                        >
                            <FaHeart /> {liked[selectedImage.id] ? 'Marked as Relaxed' : 'Relax with this view'}
                        </button>
                    </div>

                    <button onClick={nextImage} style={{ position: 'absolute', right: '40px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer' }}>
                        <FaChevronRight size={24} />
                    </button>
                </div>
            )}

            <style>{`
                .photo-card:hover { transform: translateY(-10px); boxShadow: 0 20px 40px rgba(0,0,0,0.15); }
                .photo-card:hover .preview-img { transform: scale(1.1); }
                @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
};

export default HobbyPhotography;
