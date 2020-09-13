const { Router } = require('express')
// const { getCubes, getCubeById, getCubesByNameAndDifficulty } = require('../controllers/db');
const Cube = require('../models/cube');
const Accessory = require('../models/accessory')
const { getAllCubes, getCubeById, getCubesByNameAndDifficulty, updateCube, getCubeWithAccessoriesById } = require('../controllers/cube')
const { getAccessories } = require('../controllers/accessory')

const router = Router();

router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Cube',
        cubes: await getAllCubes()
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
    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel });

    cube.save((error) => {
        if (error) {
            console.log(error);
            res.redirect('/create');
        } else {
            res.redirect('/');
        }
    });
})

router.get('/details/:id', async (req, res) => {
    res.render('details', {
        title: 'Details',
        cube: await getCubeWithAccessoriesById(req.params.id)
    })
})

router.post('/search', async (req, res) => {
    const { search, from, to } = req.body

    res.render('index', {
        title: 'Search',
        cubes: await getCubesByNameAndDifficulty(search, from, to)
    })
})

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory'
    })
})

router.post('/create/accessory', (req, res) => {
    const { name, description, imageUrl } = req.body

    const accessory = new Accessory({ name, description, imageUrl });

    accessory.save((error) => {
        if (error) {
            console.log(error);
            res.redirect('/create/accessory')
        } else {
            res.redirect('/');
        }
    })
})

router.get('/attach/accessory/:id', async (req, res) => {
    const cube = await await getCubeById(req.params.id)
    const accessories = await getAccessories(req.params.id)
    const nonAttachedAccessories = accessories.filter(acc => !cube.accessories.includes(acc._id.toString()))

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        cube,
        accessories: nonAttachedAccessories,
        isCubeHasAllAccessories: cube.accessories.length === accessories.length
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    const { accessory } = req.body
    await updateCube(req.params.id, accessory);
    res.redirect(`/details/${req.params.id}`)
})

router.all('*', (req, res) => {
    res.render('404', {
        title: 'Error'
    })
})

module.exports = router;