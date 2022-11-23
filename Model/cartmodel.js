const mongoose = require("mongoose")


const scm = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
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
    },
    totalqty:{
        type:Number
    },
    cartamt:{
        type:Number
    }
    

})

const cartmodel = new mongoose.model("cart", scm)
module.exports = cartmodel