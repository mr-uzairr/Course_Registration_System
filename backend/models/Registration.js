const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    status: { type: String, enum: ['registered', 'waiting'], default: 'registered' }
}, { timestamps: true });

module.exports = mongoose.model('Registration', RegistrationSchema);
