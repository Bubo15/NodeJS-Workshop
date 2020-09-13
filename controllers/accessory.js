const Accessory = require('../models/accessory')

const getAccessories = async () => {
    return await Accessory.find().lean();
} 

module.exports = {
    getAccessories
}