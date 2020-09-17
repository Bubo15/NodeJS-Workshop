const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9]+$/, 'Accessory name is not Valid'],
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        maxlength: 200,
        match: [/^[A-Za-z0-9 ]+$/, 'Accessory description is not Valid'],
        minlength: 20
    },
    imageUrl: {
        type: String,
        required: true,
    },
    cubes: [{
        type: ObjectId,
        ref: 'Cube'
    }]
})

AccessorySchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http') || url.startsWith('https')
}, "Image URL Not valid!")

module.exports = mongoose.model('Accessory', AccessorySchema);