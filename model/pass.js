const mongoose = require('mongoose');

const passschema = new mongoose.Schema({
    password: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('pass', passschema);