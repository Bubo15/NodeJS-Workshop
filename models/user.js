const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        match: [/^[A-Za-z0-9]+$/, 'Username must be with english letters and digits']
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', UserSchema);