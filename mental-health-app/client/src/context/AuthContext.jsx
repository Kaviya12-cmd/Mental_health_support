import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Ideally verify token with backend, but for speed we decode/assume valid if existing
                    // Better: fetch profile
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    // const res = await axios.get('/api/auth/me'); // If we had this endpoint

                    // Decode from localstorage if we stored user info 
                    const userData = JSON.parse(localStorage.getItem('user'));
                    setUser(userData);
                } catch (error) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (mobile, password) => {
        const res = await axios.post('/api/auth/login', { mobile, password });

        // Retrieve name from localStorage if it exists for this mobile
        const storedNames = JSON.parse(localStorage.getItem('mindease_names') || '{}');
        const name = storedNames[mobile] || 'User';

        const userData = { ...res.data, name };
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(userData);
    };

    const signup = async (mobile, password, name) => {
        const res = await axios.post('/api/auth/signup', { mobile, password });

        // Store name in a dedicated map in localStorage to persist across logins
        const storedNames = JSON.parse(localStorage.getItem('mindease_names') || '{}');
        storedNames[mobile] = name;
        localStorage.setItem('mindease_names', JSON.stringify(storedNames));

        const userData = { ...res.data, name };
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
