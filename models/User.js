const mongoose = require('mongoose');

const UserScehma = mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255
    },
    contactNo : {
        type: String,
        required: true,
        length: 10
    },
    password : {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User',UserScehma);