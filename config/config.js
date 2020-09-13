module.exports = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: `mongodb+srv://user:secretpassword@cube.y3lep.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};