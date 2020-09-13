const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express')
const indexRouter = require('./routes')
const app = require('express')();
const mongoose = require('mongoose')


mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {

    if(err){
        console.log(err);
    }

    console.log('Successfuly connected to DB');
})


require('./config/express')(app);

app.use('/', indexRouter)

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

// so we can keep deff env, like write this in terminal :)
// set NODE_ENV=production
// set NODE_ENV=development 
