const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    strictQuery: true
});

const myModel = mongoose.model('Login-DB', mySchema, 'users');

module.exports = myModel;