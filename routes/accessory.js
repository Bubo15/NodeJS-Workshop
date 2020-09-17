const { Router } = require('express')

const Accessory = require('../models/accessory')
const { getCubeById, updateCube } = require('../controllers/cube')
const { getAccessories } = require('../controllers/accessory')
const { isAuthenticated, getUserStatus, isAuthenticatedJSON } = require('../controllers/user')


const router = Router();

router.get('/create/accessory', isAuthenticated, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory',
        isLogged: req.isLogged
    })
})

router.post('/create/accessory', isAuthenticatedJSON, async (req, res) => {
    const { name, description, imageUrl } = req.body
    const accessory = new Accessory({ name: name.trim(), description: description.trim(), imageUrl });

    try {
        await accessory.save()
        res.redirect('/')
    } catch (err) {
        res.render('createAccessory', {
            title: 'Create Accessory',
            isLogged: req.isLogged,
            error: err
        })
    }
})

router.get('/attach/accessory/:id', isAuthenticated, getUserStatus, async (req, res) => {
    const cube = await await getCubeById(req.params.id)
    const accessories = await getAccessories(req.params.id)
    const nonAttachedAccessories = accessories.filter(acc => !cube.accessories.includes(acc._id.toString()))

    res.render('attachAccessory', {
        isLogged: req.isLogged,
        title: 'Attach Accessory',
        cube,
        accessories: nonAttachedAccessories,
        isCubeHasAllAccessories: cube.accessories.length === accessories.length
    })
})

router.post('/attach/accessory/:id', isAuthenticatedJSON, async (req, res) => {
    const { accessory } = req.body
    await updateCube(req.params.id, accessory);
    res.redirect(`/details/${req.params.id}`)
})

module.exports = router;