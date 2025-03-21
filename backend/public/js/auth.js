const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { username, rollNumber, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, rollNumber, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, rollNumber, password } = req.body;
        const user = username ? await User.findOne({ username }) : await User.findOne({ rollNumber });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
