const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    rollNumber: { type: String, unique: true, sparse: true },  // Only for students
    username: { type: String, unique: true, sparse: true },    // Only for admins
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], required: true } // Role-based authentication
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
