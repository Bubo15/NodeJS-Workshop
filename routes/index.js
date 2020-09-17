const { Router } = require('express')
// const { getCubes, getCubeById, getCubesByNameAndDifficulty } = require('../controllers/db');
const { getAllCubes, getCubesByNameAndDifficulty } = require('../controllers/cube')
const { getUserStatus } = require('../controllers/user')

const router = Router();

router.get('/',getUserStatus, async (req, res) => {
    res.render('index', {
        title: 'Cube',
        cubes: await getAllCubes(),
        isLogged: req.isLogged
    })
})

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About',
        isLogged: req.isLogged
    })
})

router.post('/search', async (req, res) => {
    const { search, from, to } = req.body

    res.render('index', {
        title: 'Search',
        cubes: await getCubesByNameAndDifficulty(search, from, to)
    })
})

module.exports = router;