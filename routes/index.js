const { Router } = require('express')
const { getCubes, getCubeById, getCubesByNameAndDifficulty } = require('../controllers/db');
const Cube = require('../models/cube');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube',
        cubes: getCubes
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create'
    })
})

router.post('/create/cube', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body
    const cube = new Cube(name, description, imageUrl, difficultyLevel);

    cube.save();

    res.redirect('/');
})

router.get('/details/:id', (req, res) => {

    res.render('details', {
        title: 'Details',
        cube: getCubeById(req.params.id)
    })
})

router.post('/search', (req, res) => {
    const { search, from, to } = req.body

    res.render('index', {
        title: 'Search',
        cubes: getCubesByNameAndDifficulty(search, from, to)
    })
})

router.all('*', (req, res) => {
    res.render('404', {
        title: 'Error'
    })
})

module.exports = router;