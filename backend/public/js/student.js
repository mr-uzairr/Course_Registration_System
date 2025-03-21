const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const Registration = require("../../models/Registration");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/courses", authMiddleware, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});

router.post("/register", authMiddleware, async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId);

        if (!course || course.availableSeats <= 0) return res.status(400).json({ error: "Course full or not found" });

        await Registration.create({ studentId: req.user.id, courseId });

        course.availableSeats -= 1;
        await course.save();

        res.json({ message: "Registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

module.exports = router;
