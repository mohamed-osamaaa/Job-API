const mongoose = require('mongoose');
const validator = require('validator');
const role = require('../utels/roles');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: [role.ADMIN, role.USER],
        default: role.USER
    },
    avatar: {
        type: String,
        default: 'uploads/img1.jpg'
    }
});
module.exports = mongoose.model('User', UserSchema);
