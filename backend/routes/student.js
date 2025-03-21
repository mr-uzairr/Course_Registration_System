const express = require('express');
const { verifyToken, isStudent } = require('../middleware/authMiddleware');
const Course = require('../models/Course');
const Registration = require('../models/Registration');

const router = express.Router();

// Get available courses
router.get('/courses', verifyToken, isStudent, async (req, res) => {
    try {
        const courses = await Course.find().populate('prerequisites', 'title');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Register for a course
router.post('/register', verifyToken, isStudent, async (req, res) => {
    const { courseId } = req.body;
    const studentId = req.user.id;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const existingRegistration = await Registration.findOne({ student: studentId, course: courseId });
        if (existingRegistration) return res.status(400).json({ message: 'Already registered' });

        if (course.availableSeats > 0) {
            course.availableSeats -= 1;
            await course.save();

            const registration = new Registration({ student: studentId, course: courseId, status: 'registered' });
            await registration.save();

            res.json({ message: 'Registered successfully' });
        } else {
            const waitlist = new Registration({ student: studentId, course: courseId, status: 'waiting' });
            await waitlist.save();
            res.json({ message: 'Added to waitlist' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
