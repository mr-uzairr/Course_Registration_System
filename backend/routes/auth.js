const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Student & Admin Login
router.post('/login', async (req, res) => {
    const { rollNumber, username, password } = req.body;

    try {
        let user;

        if (rollNumber) {
            // Student login using roll number
            user = await User.findOne({ rollNumber });
        } else if (username) {
            // Admin login using username
            user = await User.findOne({ username });
        }

        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
