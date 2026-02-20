import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Chatbot from '../components/Chatbot';
import Relax from '../components/Relax';
import Assessment from './Assessment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardCheck, FaSpa, FaSignOutAlt, FaLeaf, FaWind, FaPalette, FaChartLine } from 'react-icons/fa';
import Hobbies from '../components/Hobbies';
import Breathing from '../components/Breathing';
import ProgressDashboard from '../components/ProgressDashboard';
import WellnessSuggestions from '../components/WellnessSuggestions';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const [assessmentStatus, setAssessmentStatus] = useState({ completed: false, loading: true });

    // Use name from user object or fallback to mobile/User
    const displayName = user?.name || user?.mobile || 'User';

    useEffect(() => {
        const checkAssessment = async () => {
            try {
                const res = await axios.get('/api/assessment/status');
                setAssessmentStatus({ ...res.data, loading: false });
            } catch (error) {
                console.error("Failed to check assessment status", error);
                setAssessmentStatus({ completed: false, loading: false });
            }
        };
        checkAssessment();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'assessment':
                return <Assessment
                    onComplete={() => setAssessmentStatus({ ...assessmentStatus, completed: true })}
                    backToHome={() => setActiveTab('home')}
                />;
            case 'relax':
                return <Relax />;
            case 'breathing':
                return <Breathing />;
            case 'hobbies':
                return <Hobbies />;
            case 'progress':
                return <ProgressDashboard />;
            default:
                return (
                    <div className="fade-in">
                        {/* Welcome Banner */}
                        <div style={{
                            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                            borderRadius: '32px',
                            padding: '3.5rem',
                            color: 'white',
                            marginBottom: '2.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(108, 99, 255, 0.2)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '1.5rem' }}>
                                    <div style={{
                                        width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '800',
                                        border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(5px)'
                                    }}>
                                        {displayName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h1 style={{ fontSize: '2.8rem', margin: 0, color: 'white', fontWeight: '800' }}>Welcome back, {displayName} 👋</h1>
                                        <p style={{ fontSize: '1.1rem', opacity: 0.9, marginTop: '5px' }}>Let's work on your wellness journey together.</p>
                                    </div>
                                </div>
                                <p style={{ fontSize: '1.25rem', opacity: 0.95, lineHeight: '1.6', maxWidth: '800px' }}>
                                    "Your mental health is a priority. Your self-care is a necessity."
                                </p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        onClick={() => setActiveTab('assessment')}
                                        style={{
                                            marginTop: '2rem',
                                            background: 'white',
                                            color: 'var(--primary-color)',
                                            padding: '14px 28px',
                                            borderRadius: '14px',
                                            fontSize: '1.1rem',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        Check In Today
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('breathing')}
                                        style={{
                                            marginTop: '2rem',
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(5px)',
                                            color: 'white',
                                            border: '1px solid rgba(255,255,255,0.4)',
                                            padding: '14px 28px',
                                            borderRadius: '14px',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        Breathe
                                    </button>
                                </div>
                            </div>
                            <div style={{ position: 'relative', zIndex: 2, width: '35%', display: 'flex', justifyContent: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80"
                                        alt="MindEase Wellness"
                                        style={{ width: '220px', height: '220px', borderRadius: '30px', objectFit: 'cover', border: '5px solid rgba(255,255,255,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', transform: 'rotate(5deg)' }}
                                    />
                                    <div style={{ position: 'absolute', top: '-20px', left: '-20px', zIndex: -1 }}>
                                        <FaLeaf size={80} style={{ opacity: 0.5, color: 'white' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative circles */}
                            <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                            <div style={{ position: 'absolute', left: '20%', bottom: '-30%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                        </div>

                        {/* Feature 3: Proactive Suggestions */}
                        <WellnessSuggestions setActiveTab={setActiveTab} />

                        {
                            !assessmentStatus.loading && !assessmentStatus.completed && (
                                <div className="card glass-panel fade-in" style={{
                                    borderLeft: '6px solid var(--warning-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: 'rgba(255, 118, 117, 0.05)',
                                    borderColor: 'var(--warning-color)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            background: 'var(--warning-color)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}>
                                            <FaClipboardCheck size={24} />
                                        </div>
                                        <div>
                                            <h3 style={{ color: 'var(--warning-color)', fontSize: '1.2rem', marginBottom: '4px' }}>Daily Assessment Pending</h3>
                                            <p style={{ color: 'var(--sidebar-text)', margin: 0 }}>Discover how you're feeling and get personalized mindfulness tips.</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('assessment')}
                                        style={{
                                            background: 'var(--warning-color)',
                                            color: 'white',
                                            boxShadow: '0 8px 16px rgba(255, 118, 117, 0.2)',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        Start Now
                                    </button>
                                </div>
                            )
                        }

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '3rem 0 1.5rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem' }}>
                                <div style={{ width: '8px', height: '24px', background: 'var(--accent-color)', borderRadius: '4px' }}></div>
                                Recommendations for You
                            </h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
                            {/* Relax Zone - Premium Card */}
                            <div
                                className="card transition-all"
                                onClick={() => setActiveTab('relax')}
                                style={{
                                    cursor: 'pointer',
                                    padding: 0,
                                    borderRadius: '40px',
                                    border: '1px solid #F0F3FF',
                                    overflow: 'hidden',
                                    background: 'white',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                                        alt="Relax Zone"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s' }}
                                        className="card-img"
                                    />
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
                                        <FaSpa color="var(--secondary-color)" size={20} />
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.8rem' }}>Relax Zone</h3>
                                    <p style={{ color: 'var(--sidebar-text)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                        Escape into a sanctuary of soothing sounds, mindful wisdom, and flow-state gaming.
                                    </p>
                                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary-color)', fontWeight: '800', fontSize: '0.85rem' }}>
                                        EXPLORE SANCTUARY →
                                    </div>
                                </div>
                            </div>

                            {/* Assessment - Premium Card */}
                            <div
                                className="card transition-all"
                                onClick={() => setActiveTab('assessment')}
                                style={{
                                    cursor: 'pointer',
                                    padding: 0,
                                    borderRadius: '40px',
                                    border: '1px solid #F0F3FF',
                                    overflow: 'hidden',
                                    background: 'white',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1454165833767-027ffb2a48bd?auto=format&fit=crop&w=600&q=80"
                                        alt="Daily Check-in"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s' }}
                                        className="card-img"
                                    />
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
                                        <FaClipboardCheck color="var(--primary-color)" size={20} />
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.8rem' }}>Daily Check-in</h3>
                                    <p style={{ color: 'var(--sidebar-text)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                        Map your emotional landscape with AI-powered insights and personalized guidance.
                                    </p>
                                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: '800', fontSize: '0.85rem' }}>
                                        START ASSESSMENT →
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Wellness Statistics Quick View */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem', marginBottom: '3rem'
                        }}>
                            {[
                                { label: 'Well-being Score', value: '88%', icon: '📈', color: '#6C63FF' },
                                { label: 'Min. Relaxed', value: '120m', icon: '🧘', color: '#00D2D3' },
                                { label: 'Consecutive Days', value: '14 🔥', icon: '📅', color: '#FF7675' },
                                { label: 'AI Support Hours', value: '24/7', icon: '🤖', color: '#1DD1A1' }
                            ].map((stat, i) => (
                                <div key={i} className="glass-panel" style={{
                                    padding: '1.5rem', borderRadius: '25px', background: 'white',
                                    display: 'flex', alignItems: 'center', gap: '15px',
                                    border: '1px solid #F0F3FF'
                                }}>
                                    <span style={{ fontSize: '1.8rem' }}>{stat.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: '900', color: stat.color }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#636E72', fontWeight: '600', textTransform: 'uppercase' }}>{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div >
                );
        }
    };

    const NavItem = ({ tab, icon, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            style={{
                width: '100%',
                textAlign: 'left',
                background: activeTab === tab ? 'var(--sidebar-active)' : 'transparent',
                color: activeTab === tab ? 'var(--primary-color)' : 'var(--sidebar-text)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 20px',
                borderRadius: '16px',
                fontWeight: activeTab === tab ? '700' : '500',
                transition: 'var(--transition-smooth)',
                fontSize: '1rem'
            }}
        >
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            <span className="nav-label">{label}</span>
        </button>
    );

    return (
        <div className="layout">
            <aside className="sidebar">
                <div style={{ padding: '0 0.5rem 3rem', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)'
                    }}>
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>M</span>
                    </div>
                    <h2 style={{ fontSize: '1.6rem', color: 'var(--heading-color)', fontWeight: '800' }}>MindEase</h2>
                </div>

                <nav style={{ flex: 1, overflowY: 'auto' }}>
                    <NavItem tab="home" icon={<FaHome />} label="Dashboard" />
                    <NavItem tab="assessment" icon={<FaClipboardCheck />} label="Assessment" />
                    <NavItem tab="relax" icon={<FaSpa />} label="Relax Zone" />
                    <NavItem tab="breathing" icon={<FaWind />} label="Breathing" />
                    <NavItem tab="hobbies" icon={<FaPalette />} label="Hobbies" />
                    <NavItem tab="progress" icon={<FaChartLine />} label="Wellness Progress" />
                </nav>

                <button
                    onClick={logout}
                    style={{
                        background: 'rgba(255, 118, 117, 0.1)',
                        color: 'var(--warning-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        marginTop: 'auto',
                        padding: '14px',
                        borderRadius: '16px',
                        width: '100%',
                        fontWeight: '700'
                    }}
                >
                    <FaSignOutAlt /> <span className="nav-label">Logout</span>
                </button>
            </aside>
            <main className="main-content">
                {renderContent()}
            </main>
            <Chatbot />
        </div>
    );
};

export default Dashboard;

