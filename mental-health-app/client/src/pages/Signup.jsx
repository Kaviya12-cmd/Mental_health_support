import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(mobile, password, name);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card fade-in">
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'var(--primary-color)',
                        borderRadius: '16px',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(108, 99, 255, 0.3)'
                    }}>
                        <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>M</span>
                    </div>
                    <h2 style={{ color: 'var(--heading-color)', marginBottom: '0.75rem', fontSize: '2.2rem', fontWeight: '800' }}>Join MindEase</h2>
                    <p style={{ color: 'var(--sidebar-text)', fontSize: '1.1rem' }}>Start your journey to better mental health</p>
                </div>

                {error && (
                    <div className="fade-in" style={{
                        padding: '12px 16px',
                        background: '#FFF5F5',
                        color: '#E53E3E',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '1.5rem',
                        fontSize: '0.95rem',
                        border: '1px solid rgba(229, 62, 62, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--heading-color)', fontSize: '0.9rem' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Arjun Kumar"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--heading-color)', fontSize: '0.9rem' }}>Mobile Number</label>
                        <input
                            type="text"
                            placeholder="e.g. 9876543210"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--heading-color)', fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            placeholder="Minimum 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={{
                        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                        color: 'white',
                        width: '100%',
                        padding: '16px',
                        fontSize: '1.1rem',
                        boxShadow: '0 10px 20px rgba(108, 99, 255, 0.3)',
                        marginTop: '0.5rem'
                    }}>
                        Create Account
                    </button>
                </form>

                <p style={{ marginTop: '2rem', color: 'var(--sidebar-text)', fontSize: '1rem' }}>
                    Already have an account? <Link to="/login" style={{
                        color: 'var(--primary-color)',
                        fontWeight: '700',
                        textDecoration: 'none',
                        borderBottom: '2px solid rgba(108, 99, 255, 0.2)',
                        paddingBottom: '2px',
                        transition: 'var(--transition-smooth)'
                    }}>Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;

