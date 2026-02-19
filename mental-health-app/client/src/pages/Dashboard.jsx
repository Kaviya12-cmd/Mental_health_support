import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Chatbot from '../components/Chatbot';
import Relax from '../components/Relax';
import Assessment from './Assessment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('home');
    const [assessmentStatus, setAssessmentStatus] = useState({ completed: false, loading: true });

    useEffect(() => {
        const checkAssessment = async () => {
            try {
                const res = await axios.get('/api/assessment/status');
                setAssessmentStatus({ ...res.data, loading: false });
                if (!res.data.completed) {
                    // Optionally force to assessment tab
                    // setActiveTab('assessment');
                }
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
                return <Assessment onComplete={() => setAssessmentStatus({ ...assessmentStatus, completed: true })} />;
            case 'relax':
                return <Relax />;
            default:
                return (
                    <div className="fade-in">
                        <h1>Welcome, {user?.mobile}</h1>
                        <p style={{ fontSize: '1.2rem', color: '#555', marginTop: '1rem' }}>
                            Your mental well-being is our priority.
                        </p>

                        {!assessmentStatus.loading && !assessmentStatus.completed && (
                            <div className="card" style={{ borderLeft: '5px solid var(--warning-color)', marginTop: '2rem' }}>
                                <h3>Assessment Pending</h3>
                                <p>Please complete your assessment to get personalized support.</p>
                                <button
                                    onClick={() => setActiveTab('assessment')}
                                    style={{ background: 'var(--warning-color)', color: 'white', marginTop: '1rem' }}
                                >
                                    Take Assessment
                                </button>
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div className="card" onClick={() => setActiveTab('relax')} style={{ cursor: 'pointer', textAlign: 'center' }}>
                                <h3>Relax Zone</h3>
                                <p>Music, Games, Flashcards</p>
                            </div>
                            <div className="card" onClick={() => setActiveTab('assessment')} style={{ cursor: 'pointer', textAlign: 'center' }}>
                                <h3>Check-in</h3>
                                <p>How are you feeling today?</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="layout">
            <aside className="sidebar">
                <h2 style={{ marginBottom: '2rem' }}>MindEase</h2>
                <nav style={{ flex: 1 }}>
                    <button
                        onClick={() => setActiveTab('home')}
                        style={{ width: '100%', textAlign: 'left', background: activeTab === 'home' ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'inherit', marginBottom: '10px' }}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setActiveTab('assessment')}
                        style={{ width: '100%', textAlign: 'left', background: activeTab === 'assessment' ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'inherit', marginBottom: '10px' }}
                    >
                        Assessment
                    </button>
                    <button
                        onClick={() => setActiveTab('relax')}
                        style={{ width: '100%', textAlign: 'left', background: activeTab === 'relax' ? 'rgba(255,255,255,0.2)' : 'transparent', color: 'inherit', marginBottom: '10px' }}
                    >
                        Relax
                    </button>
                </nav>
                <button onClick={logout} style={{ background: 'rgba(0,0,0,0.2)', color: 'white' }}>Logout</button>
            </aside>
            <main className="main-content">
                {renderContent()}
            </main>
            <Chatbot />
        </div>
    );
};

export default Dashboard;
