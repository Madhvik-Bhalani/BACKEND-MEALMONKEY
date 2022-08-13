const mongoose = require("mongoose")


const scm = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    veg: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
    

})

const foodmodel = new mongoose.model("product", scm)
module.exports = foodmodel