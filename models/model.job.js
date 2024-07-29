const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    workHours: {
        type: Number,
        require: true
    }
});
module.exports = mongoose.model('Job', JobSchema);
