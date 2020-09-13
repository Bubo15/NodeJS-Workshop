// const fs = require('fs');
// const path = require('path');
// const Cube = require('../models/cube');

// const isNameEquals = (cube, name) => {return cube.name.slice(0, name.length) === name}
// const isDifficultyInScope = (cube, diffUp, diffFloor) => {
//     diffUp = diffUp.length == 0 ? 1 : diffUp
//     diffFloor = diffFloor.length == 0 ? 6 : diffFloor
//     return parseInt(cube.difficulty) >= diffUp && parseInt(cube.difficulty) <= diffFloor
// }


// const getCubes = () => {
//     const cubes = fs.readFileSync(path.join(__dirname, "..", "config/database.json"))
//     return JSON.parse(cubes);
// }

// const getCubeById = (id) => {
//     const cube = getCubes().filter(cube => cube.id === id)[0]
//     return cube
// }

// const getCubesByNameAndDifficulty = (name, diffUp, diffFloor) => {
//     const cubesByName = getCubes().filter(cube => isNameEquals(cube, name) && isDifficultyInScope(cube, diffUp, diffFloor))
//     const cubesByDifficulty = getCubes().filter(cube => isDifficultyInScope(cube, diffUp, diffFloor));

//     return name.length === 0 ? cubesByDifficulty : cubesByName
// }

// module.exports = {
//     getCubes,
//     getCubeById,
//     getCubesByNameAndDifficulty
// };