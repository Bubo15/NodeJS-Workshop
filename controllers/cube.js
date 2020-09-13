const Cube = require('../models/cube')

const isNameEquals = (cube, name) => { return cube.name.slice(0, name.length) === name }
const isDifficultyInScope = (cube, diffUp, diffFloor) => {
    diffUp = diffUp.length == 0 ? 1 : diffUp
    diffFloor = diffFloor.length == 0 ? 6 : diffFloor
    return parseInt(cube.difficulty) >= diffUp && parseInt(cube.difficulty) <= diffFloor
}

const getAllCubes = async () => {
    const cubes = await Cube.find().lean()
    return cubes
}

const getCubeById = async (id) => {
    return await Cube.findById(id)
}

const by = {
    cubesByName: async (name, diffUp, diffFloor) => await Cube.find().then(res => res.filter(cube => isNameEquals(cube, name) && isDifficultyInScope(cube, diffUp, diffFloor))),
    cubesByDifficulty: async (diffUp, diffFloor) => await Cube.find().then(res => res.filter(cube => isDifficultyInScope(cube, diffUp, diffFloor)))
}

const getCubesByNameAndDifficulty = (name, diffUp, diffFloor) => {
    return name.length === 0 ? by['cubesByDifficulty'](diffUp, diffFloor) : by['cubesByName'](name, diffUp, diffFloor)
}

const updateCube = async (id, accessoryId) => {
    await Cube.findByIdAndUpdate(id, {
        $addToSet: {
            accessories: [accessoryId]
        }
    })
}

const getCubeWithAccessoriesById = async (id) => {
    return await Cube.findById(id).populate('accessories').lean()
}

module.exports = {
    getAllCubes,
    getCubeById,
    getCubesByNameAndDifficulty,
    updateCube,
    getCubeWithAccessoriesById
}