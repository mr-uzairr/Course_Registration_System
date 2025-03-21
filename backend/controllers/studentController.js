const Course = require('../models/Course');
const Registration = require('../models/Registration');

exports.getCourses = async (req, res) => {
    try {
        const { department, level, time, days, availableSeats } = req.query;
        let filter = {};

        if (department) filter.department = department;
        if (level) filter.level = level;
        if (time) filter.time = time;
        if (days) filter.days = { $in: days.split(',') };
        if (availableSeats) filter.seatsAvailable = { $gte: 1 };

        const courses = await Course.find(filter);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.registerCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course || course.seatsAvailable <= 0) {
            return res.status(400).json({ message: 'Course full or does not exist' });
        }

        const registration = new Registration({ student: studentId, course: courseId });
        await registration.save();

        course.seatsAvailable -= 1;
        await course.save();

        res.json({ message: 'Course registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getSchedule = async (req, res) => {
    try {
        const { studentId } = req.params;
        const registrations = await Registration.find({ student: studentId }).populate('course');
        res.json(registrations.map(reg => reg.course));
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
