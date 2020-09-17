const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const accessoryRouter = require('./routes/accessory')
const cubeRouter = require('./routes/cube')

const app = require('express')();
const mongoose = require('mongoose');

mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) { console.log(err) }

    console.log('Successfuly connected to DB')
})

require('./config/express')(app);

app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/', accessoryRouter)
app.use('/', cubeRouter)

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error'
    })
})

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));