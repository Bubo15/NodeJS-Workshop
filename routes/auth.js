const { Router } = require('express')

const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user')
const router = Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {
    const error = req.query.error ? 'Username or password is not valid' : null
    res.render('loginPage', {
        isLogged: req.isLogged,
        error
    })
})

router.post('/login', async (req, res) => {
    await verifyUser(req, res) ? res.redirect('/') : res.redirect('/login?error=true')
})

router.get('/register', guestAccess, getUserStatus, (req, res) => {
    res.render('registerPage', {
        isLogged: req.isLogged
    })
})

router.post('/register', async (req, res) => {
    const { message } = await saveUser(req, res);

    console.log(message);

    if (message) {
        return res.render('registerPage', {
            isLogged: req.isLogged,
            error: message
        })
    }
    
    return res.redirect('/')
})

router.get('/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
})

module.exports = router;