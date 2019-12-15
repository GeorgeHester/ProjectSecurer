const mongoose = require('mongoose');

const passwordsschema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
}, { versionKey: false });

module.exports = mongoose.model('password', passwordsschema);