const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const getToken = data => {
    return jwt.sign(data, config.privateKey);
}

const saveUser = async (req, res) => {
    const { username, password, repeatPassword } = req.body

    if (!password || password.length < 8 || !password.match(/^[A-Za-z0-9]+$/) || password !== repeatPassword) {
        return { message: "Incorrect password" }
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({ username, password: hashedPassword })

        try {
            const userObject = await user.save()

            const token = getToken({
                userID: userObject._id,
                username: userObject.username
            })

            res.cookie('auth', token)
            return { message: "" }
        } catch (err) {
            return { message: err }
        }
    }
}

const verifyUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if(!user){ return false; }

        const status = await bcrypt.compare(password, user.password)

        if (status) {
            const token = getToken({
                userID: user._id,
                username: user.username
            })

            res.cookie('auth', token)
        }

        return status
    } catch (err) {
        return false;
    }
}

const isAuthenticated = (req, res, next) => {
    const token = req.cookies['auth']
    if (!token) { res.redirect('/') }

    try {
        jwt.verify(token, config.privateKey)
        next()
    } catch (e) {
        return res.redirect('/')
    }
}

const isAuthenticatedJSON = (req, res, next) => {
    const token = req.cookies['auth']
    if (!token) { return res.join({ error: 'Not Authenticated' }) }

    try {
        jwt.verify(token, config.privateKey)
        next()
    } catch (e) {
        return res.join({ error: 'Not Authenticated' })
    }
}

const guestAccess = (req, res, next) => {
    const token = req.cookies['auth']
    if (token) { return res.redirect('/') }
    next()
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['auth']
    if (!token) { req.isLogged = false }

    try {
        jwt.verify(token, config.privateKey)
        req.isLogged = true
    } catch (e) {
        req.isLogged = false
    }

    next()
}

module.exports = {
    saveUser,
    verifyUser,
    isAuthenticated,
    guestAccess,
    getUserStatus,
    isAuthenticatedJSON
};