const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const { Router } = require('express')
const Cube = require('../models/cube');
const { getCubeWithAccessoriesById, getCubeById, deleteCubeById, editCube } = require('../controllers/cube')
const { isAuthenticated, getUserStatus, isAuthenticatedJSON } = require('../controllers/user')
const jwt = require('jsonwebtoken')

const router = Router();

router.get('/create', isAuthenticated, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create',
        isLogged: req.isLogged
    })
})

router.post('/create/cube', isAuthenticatedJSON, async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body
    const token = req.cookies['auth']
    const decodedObject = jwt.verify(token, config.privateKey)

    const cube = new Cube({ name: name.trim(), description: description.trim(), imageUrl, difficulty: difficultyLevel, creatorID: decodedObject.userID });

    try{
        await cube.save();
        return res.redirect('/')
    }catch(err){
        return res.render('create', {
            title: 'Create',
            isLogged: req.isLogged,
            error: err.toString().substring(16)
        })
    }
})

router.get('/details/:id', getUserStatus, async (req, res) => {
    res.render('details', {
        title: 'Details',
        cube: await getCubeWithAccessoriesById(req.params.id),
        isLogged: req.isLogged
    })
})

router.get('/edit/:id', isAuthenticated, getUserStatus, async (req, res) => {
    res.render('editCubePage', {
        title: 'Edit Cube',
        isLogged: req.isLogged,
        cube: await getCubeById(req.params.id),
    })
})

router.get('/delete/:id', isAuthenticated, getUserStatus, async (req, res) => {
    res.render('deleteCubePage', {
        title: 'Delete Cube',
        isLogged: req.isLogged,
        cube: await getCubeById(req.params.id),
    })
})

router.post('/delete/:id', isAuthenticated, getUserStatus, (req, res) => {
    deleteCubeById(req.params.id, () => {
        res.redirect('/')
    })
})

router.post('/edit/:id', isAuthenticated, getUserStatus, async (req, res) => {
    const cubeId = req.params.id
    
    try{
        await editCube(req, cubeId)
        res.redirect(`/details/${cubeId}`)
    }catch(err){
        res.render('editCubePage', {
            title: 'Edit Cube',
            isLogged: req.isLogged,
            cube: await getCubeById(req.params.id),
            error: err
        })
    }
})

module.exports = router;