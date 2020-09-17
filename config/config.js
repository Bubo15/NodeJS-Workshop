module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: process.env.PRIVATE_KEY,
        dbUrl: `mongodb+srv://user:secretpassword@cube.y3lep.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};