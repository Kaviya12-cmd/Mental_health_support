const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendSMS = require('../utils/smsService');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { mobile, password } = req.body;

    try {
        const userExists = await User.findOne({ mobile });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashing is handled in User model pre-save hook
        const user = await User.create({
            mobile,
            password,
        });

        if (user) {
            // Send Welcome SMS
            sendSMS(user.mobile, "Welcome to MindEase! Your mental health journey starts now.");

            res.status(201).json({
                _id: user._id,
                mobile: user.mobile,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { mobile, password } = req.body;

    try {
        console.log("Attempting login for:", mobile);
        const user = await User.findOne({ mobile });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Send Login Notification SMS (Optional but requested "notify to my phone")
            sendSMS(user.mobile, "Alert: New login detected on your MindEase account.");

            res.json({
                _id: user._id,
                mobile: user.mobile,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid mobile number or password' });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, authUser };
