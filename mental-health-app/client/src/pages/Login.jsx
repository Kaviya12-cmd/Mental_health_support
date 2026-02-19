import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(mobile, password);
            navigate('/');
        } catch (err) {
            console.error("Login failed:", err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to login. Please check your connection.';
            setError(errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card fade-in">
                <h2>Welcome Back</h2>
                <p>Login to continue support</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" style={{ backgroundColor: 'var(--primary-color)', color: 'white', width: '100%', marginTop: '10px' }}>
                        Login
                    </button>
                </form>
                <p style={{ marginTop: '1rem' }}>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
