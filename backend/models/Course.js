const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: Number, required: true }, // e.g., 100, 200, 300 level courses
    schedule: {
        days: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }],
        time: { type: String, required: true }
    },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
