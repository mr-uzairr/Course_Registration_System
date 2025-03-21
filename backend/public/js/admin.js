const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/add-course", authMiddleware, async (req, res) => {
    try {
        const { title, totalSeats } = req.body;
        const course = new Course({ title, totalSeats, availableSeats: totalSeats });

        await course.save();
        res.json({ message: "Course added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add course" });
    }
});

router.delete("/delete-course/:id", authMiddleware, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Course deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete course" });
    }
});

module.exports = router;
