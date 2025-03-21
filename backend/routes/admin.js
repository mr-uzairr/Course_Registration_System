const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const Course = require('../models/Course');

const router = express.Router();

// Add a new course
router.post('/add-course', verifyToken, isAdmin, async (req, res) => {
    const { courseCode, title, department, level, schedule, totalSeats, prerequisites } = req.body;

    try {
        const newCourse = new Course({
            courseCode, title, department, level, schedule, totalSeats, availableSeats: totalSeats, prerequisites
        });

        await newCourse.save();
        res.json({ message: 'Course added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a course
router.delete('/delete-course/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
