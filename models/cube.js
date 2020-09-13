const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const {saveCube} = require('../controllers/db')

class Cube {

    constructor(name, description, imageUrl, difficulty){
        this.id = v4()
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

module.exports = Cube;