const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    passsalt: {
        type: String,
        required: true
    },
    vksaltstart: {
        type: String,
        required: true
    },
    vksaltend: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('user', userschema);