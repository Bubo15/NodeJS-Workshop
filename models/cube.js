// const { v4 } = require('uuid')
// const fs = require('fs')
// const path = require('path')
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

/* class Cube {

    constructor(name, description, imageUrl, difficulty) {
        this.is = v4()
        this.name = name || "Cube";
        this.description = description;
        this.imageUrl = imageUrl || "";
        this.difficulty = difficulty || 0;
    }

        save() {
    
            const newData = {
                id: this.id,
                name: this.name,
                description: this.description,
                imageUrl: this.imageUrl,
                difficulty: this.difficulty
            }
    
            fs.readFile(path.join(__dirname, '..', 'config/database.json'), (error, data) => {
                if(error){
                    throw error
                }
        
                const cubes = JSON.parse(data)
                cubes.push(newData)
        
                fs.writeFile(path.join(__dirname, '..', 'config/database.json'), JSON.stringify(cubes), (error) => {
                    if(error){
                        throw error
                    }
        
                    console.log('Successfully stored')
                })
            })
        }
}

module.exports = Cube; */

const CubeSchema = new mongoose.Schema({
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

    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    accessories: [{
        type: ObjectId,
        ref: 'Accessory'
    }]
})

CubeSchema.path('imageUrl').validate(function (url) {
    return url.startsWith('http') || url.startsWith('https')
}, "Image URL Not valid!")

module.exports = mongoose.model('Cube', CubeSchema);