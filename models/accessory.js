const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
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