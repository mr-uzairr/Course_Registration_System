const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.studentLogin = async (req, res) => {
    try {
        const { rollNumber } = req.body;
        const student = await User.findOne({ rollNumber, role: 'student' });

        if (!student) {
            return res.status(400).json({ message: 'Invalid Roll Number' });
        }

        const token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, role: 'student' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await User.findOne({ username, role: 'admin' });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, role: 'admin' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
