import { useState, useEffect } from 'react';
import { FaSave, FaTrash, FaBook, FaHistory, FaCalendarAlt } from 'react-icons/fa';

const HobbyJournaling = () => {
    const [entry, setEntry] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('mindease_journal') || '[]');
        setHistory(saved);
    }, []);

    const saveEntry = () => {
        if (!entry.trim()) return;

        const newEntry = {
            id: Date.now(),
            text: entry,
            date: new Date().toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
            time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
        };

        const newHistory = [newEntry, ...history];
        setHistory(newHistory);
        localStorage.setItem('mindease_journal', JSON.stringify(newHistory));
        setEntry('');
    };

    const deleteEntry = (id) => {
        const newHistory = history.filter(item => item.id !== id);
        setHistory(newHistory);
        localStorage.setItem('mindease_journal', JSON.stringify(newHistory));
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ paddingBottom: '1rem', borderBottom: '1px solid #F0F3FF' }}>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaBook /> Thoughts on Mind
                    </h3>
                    <p style={{ color: '#636E72', margin: '5px 0' }}>Write whatever is on your mind today. No judgment.</p>
                </div>

                <textarea
                    placeholder="Today I feel... / I am grateful for... / I noticed that..."
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '1.5rem',
                        borderRadius: '20px',
                        border: '2px solid #F0F3FF',
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        resize: 'none',
                        background: '#F8FBFF',
                        outline: 'none',
                        minHeight: '200px'
                    }}
                />

                <button
                    onClick={saveEntry}
                    disabled={!entry.trim()}
                    style={{
                        padding: '16px',
                        background: entry.trim() ? 'var(--primary-color)' : '#B0BEC5',
                        color: 'white',
                        borderRadius: '16px',
                        fontSize: '1.1rem',
                        boxShadow: entry.trim() ? '0 8px 16px rgba(108, 99, 255, 0.2)' : 'none'
                    }}
                >
                    <FaSave /> Save to Journal
                </button>
            </div>

            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', maxHeight: '500px' }}>
                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaHistory style={{ color: 'var(--secondary-color)' }} />
                    <h4 style={{ margin: 0 }}>Recent Entries</h4>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {history.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', background: '#F8FBFF', borderRadius: '20px', color: '#B0BEC5' }}>
                            <p>No entries yet. Start writing your story.</p>
                        </div>
                    ) : (
                        history.map(item => (
                            <div key={item.id} className="card" style={{ padding: '1.25rem', background: '#FFFFFF', border: '1px solid #F0F3FF', marginBottom: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: '700' }}>
                                        <FaCalendarAlt /> {item.date} • {item.time}
                                    </div>
                                    <button
                                        onClick={() => deleteEntry(item.id)}
                                        style={{ padding: '5px', background: 'transparent', color: '#FF7675' }}
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-line', maxHeight: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {item.text}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HobbyJournaling;
