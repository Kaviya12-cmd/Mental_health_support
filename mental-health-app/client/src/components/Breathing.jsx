import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaUndo, FaWind, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Breathing = () => {
    const [phase, setPhase] = useState('Get Ready');
    const [isActive, setIsActive] = useState(false);
    const [timer, setTimer] = useState(300);
    const [duration, setDuration] = useState(300);
    const [counter, setCounter] = useState(0);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [bgTheme, setBgTheme] = useState('Lavender');
    const [isComplete, setIsComplete] = useState(false);

    // Cycle timing: 4s Inhale, 4s Hold, 6s Exhale = 14s total
    const CYCLE_TIME = 14;

    const themes = {
        Lavender: 'linear-gradient(135deg, #E6E6FA 0%, #BDB5D5 100%)',
        Teal: 'linear-gradient(135deg, #E0F2F1 0%, #80CBC4 100%)',
        Blue: 'linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%)',
        Nature: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80)'
    };

    const playZenSound = (phaseType) => {
        if (!voiceEnabled || !isActive) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (phaseType === 'Inhale') {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(440, now);
                oscillator.frequency.exponentialRampToValueAtTime(660, now + 4);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.05, now + 0.5);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4);
            } else if (phaseType === 'Hold') {
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(523.25, now);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.03, now + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4);
            } else if (phaseType === 'Exhale') {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(330, now);
                oscillator.frequency.exponentialRampToValueAtTime(220, now + 6);
                gainNode.gain.setValueAtTime(0, now);
                gainNode.gain.linearRampToValueAtTime(0.05, now + 0.5);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 6);
            }

            oscillator.start();
            oscillator.stop(now + (phaseType === 'Exhale' ? 6 : 4));
        } catch (e) {
            console.warn("Audio not supported", e);
        }
    };

    const speak = (text, phaseType) => {
        if (!voiceEnabled || !isActive) return;

        if (phaseType) playZenSound(phaseType);

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        // Find a soft/therapist voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Female') || v.name.includes('Natural'));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 0.7; // Slow paced
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        let interval = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
                setCounter(prev => prev + 1);
            }, 1000);
        } else if (!isActive) {
            clearInterval(interval);
            window.speechSynthesis.cancel();
        }

        if (timer === 0 && isActive) {
            setIsActive(false);
            setIsComplete(true);
            setPhase('Complete');
            speak('Great job. You’re feeling calmer now 🤍');
        }
        return () => clearInterval(interval);
    }, [isActive, timer]);

    useEffect(() => {
        if (!isActive) return;

        const cycleProgress = counter % CYCLE_TIME;

        if (cycleProgress === 0) {
            setPhase('Inhale');
            speak('Inhale slowly', 'Inhale');
        }
        else if (cycleProgress === 4) {
            setPhase('Hold');
            speak('Hold your breath gently', 'Hold');
        }
        else if (cycleProgress === 8) {
            setPhase('Exhale');
            speak('Exhale slowly', 'Exhale');
        }
    }, [counter, isActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const progress = ((duration - timer) / duration) * 100;

    const resetSession = () => {
        setIsActive(false);
        setIsComplete(false);
        setTimer(duration);
        setCounter(0);
        setPhase('Get Ready');
        window.speechSynthesis.cancel();
    };

    return (
        <div className="breathing-module fade-in" style={{
            position: 'relative', width: '100%', height: '88vh', borderRadius: '40px',
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            background: themes[bgTheme].includes('url') ? '#000' : themes[bgTheme],
            transition: 'background 2s ease'
        }}>
            {/* Background Image Layer if nature is selected */}
            {themes[bgTheme].includes('url') && (
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: themes[bgTheme],
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.6)', zIndex: 0
                }}></div>
            )}

            {/* Overlays */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.1) 100%)',
                pointerEvents: 'none'
            }}></div>

            {/* Content Container */}
            <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Header Area */}
                <div style={{ padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div className="glass-panel" style={{ padding: '12px', borderRadius: '15px', background: 'rgba(255,255,255,0.2)' }}>
                            <FaWind color={bgTheme === 'Nature' ? 'white' : '#4A5568'} />
                        </div>
                        <h2 style={{
                            fontSize: '1.1rem', margin: 0, fontWeight: '800', letterSpacing: '2px',
                            color: bgTheme === 'Nature' ? 'white' : '#4A5568'
                        }}>BREATH GUIDE</h2>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <div style={{
                            fontSize: '2.5rem', fontWeight: '200',
                            color: bgTheme === 'Nature' ? 'white' : '#2D3748',
                            fontVariantNumeric: 'tabular-nums'
                        }}>
                            {formatTime(timer)}
                        </div>
                        <div style={{ width: '120px', height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', overflow: 'hidden', marginTop: '5px' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: '#6C63FF', transition: 'width 1s linear' }}></div>
                        </div>
                    </div>
                </div>

                {/* Central Animation Area */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {isComplete ? (
                        <div className="fade-in" style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: '200', color: '#2D3748' }}>Great job.</h2>
                            <p style={{ fontSize: '1.5rem', color: '#4A5568', marginTop: '1rem' }}>You’re feeling calmer now 🤍</p>
                            <button onClick={resetSession} style={{
                                marginTop: '2rem', background: '#6C63FF', color: 'white',
                                padding: '15px 40px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(108, 99, 255, 0.2)'
                            }}>
                                Start New Session
                            </button>
                        </div>
                    ) : (
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* The Breathing Circle */}
                            <div className={`breath-circle ${phase.toLowerCase()}`} style={{
                                width: '200px', height: '200px', borderRadius: '50%',
                                background: 'white', boxShadow: '0 0 50px rgba(255,255,255,0.5)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: phase === 'Inhale' ? 'transform 4s ease-out' : phase === 'Exhale' ? 'transform 6s ease-in' : 'transform 0.5s ease',
                                transform: phase === 'Inhale' || phase === 'Hold' ? 'scale(2.5)' : 'scale(1)',
                                zIndex: 5
                            }}>
                                <h4 style={{
                                    margin: 0, fontSize: '1.2rem', fontWeight: '300',
                                    letterSpacing: '4px', color: '#4A5568', textTransform: 'uppercase'
                                }}>{phase}</h4>
                            </div>

                            {/* Glow Effects */}
                            <div style={{
                                position: 'absolute', width: '100%', height: '100%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                                transform: phase === 'Inhale' || phase === 'Hold' ? 'scale(3.5)' : 'scale(1.5)',
                                transition: phase === 'Inhale' ? 'transform 4s ease-out' : phase === 'Exhale' ? 'transform 6s ease-in' : 'transform 0.5s ease',
                                zIndex: 1
                            }}></div>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div style={{
                    padding: '40px 60px', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(20px)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderTop: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <button onClick={() => setIsActive(!isActive)} style={{
                            width: '70px', height: '70px', borderRadius: '50%', background: '#2D3748',
                            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.4rem'
                        }}>
                            {isActive ? <FaPause /> : <FaPlay style={{ marginLeft: '4px' }} />}
                        </button>
                        <button onClick={resetSession} style={{
                            width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)',
                            color: '#2D3748', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <FaUndo />
                        </button>
                    </div>

                    {/* Theme Selector */}
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {Object.keys(themes).map(t => (
                            <button key={t} onClick={() => setBgTheme(t)} style={{
                                width: '30px', height: '30px', borderRadius: '50%',
                                background: t === 'Nature' ? '#4A5568' : (t === 'Lavender' ? '#BDB5D5' : (t === 'Teal' ? '#80CBC4' : '#90CAF9')),
                                border: bgTheme === t ? '3px solid white' : 'none',
                                cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }} title={t}></button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {[1, 3, 5].map(m => (
                                <button key={m} onClick={() => { setDuration(m * 60); setTimer(m * 60); }}
                                    style={{
                                        padding: '8px 16px', borderRadius: '12px',
                                        background: duration === m * 60 ? '#2D3748' : 'rgba(0,0,0,0.05)',
                                        color: duration === m * 60 ? 'white' : '#2D3748',
                                        fontWeight: '700', fontSize: '0.8rem'
                                    }}>
                                    {m}m
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setVoiceEnabled(!voiceEnabled)} style={{
                            fontSize: '1.4rem', color: '#2D3748', background: 'none', border: 'none', opacity: voiceEnabled ? 1 : 0.4
                        }}>
                            {voiceEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .breathing-module { font-family: 'Outfit', sans-serif; }
                .breath-circle { 
                    box-shadow: 0 0 80px rgba(255,255,255,0.6);
                }
                @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(3.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 0.5; }
                }
                .fade-in { animation: fadeIn 1s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Breathing;
