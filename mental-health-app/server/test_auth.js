const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/auth';

const testUser = {
    mobile: '1234567890',
    password: 'password123'
};

async function testAuth() {
    console.log('--- Testing Authentication Flow ---');

    // 1. Try to Login first (in case user exists)
    try {
        console.log(`Attempting login with mobile: ${testUser.mobile}...`);
        const loginRes = await axios.post(`${BASE_URL}/login`, testUser);
        console.log('Login successful!', loginRes.data);
        return;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('Login failed (expected if user not created): Invalid credentials.');
        } else {
            console.error('Login error:', error.message);
            if (error.code === 'ECONNREFUSED') {
                console.error('CRITICAL: Backend server is not running on port 5000!');
                return;
            }
        }
    }

    // 2. Register User
    try {
        console.log(`\nAttempting registration with mobile: ${testUser.mobile}...`);
        const registerRes = await axios.post(`${BASE_URL}/signup`, testUser);
        console.log('Registration successful!', registerRes.data);
    } catch (error) {
        if (error.response && error.response.data.message === 'User already exists') {
            console.log('User already exists (registration skipped).');
        } else {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            return;
        }
    }

    // 3. Retry Login after Registration
    try {
        console.log(`\nRetrying login with mobile: ${testUser.mobile}...`);
        const loginRes = await axios.post(`${BASE_URL}/login`, testUser);
        console.log('Login successful!', loginRes.data);
    } catch (error) {
        console.error('Login failed after registration:', error.response ? error.response.data : error.message);
    }
}

testAuth();
