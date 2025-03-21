const Course = require('../models/Course');
const User = require('../models/User');
const Registration = require('../models/Registration');

exports.addCourse = async (req, res) => {
    try {
        const { name, department, level, time, days, seatsAvailable, prerequisites } = req.body;

        const course = new Course({ name, department, level, time, days, seatsAvailable, prerequisites });
        await course.save();

        res.json({ message: 'Course added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updatedData = req.body;

        const course = await Course.findByIdAndUpdate(courseId, updatedData, { new: true });

        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        await Course.findByIdAndDelete(courseId);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getRegisteredStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        const registrations = await Registration.find({ course: courseId }).populate('student');

        res.json(registrations.map(reg => reg.student));
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
