const mongoose = require("mongoose")


const scm = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
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
    totalqty: {
        type: Number
    },
    cartamt: {
        type: Number
    },
    
    onum:{
        type:String,
    },
    ordertime: {
        type: String,
    },
    deliverytime: {
        type: String,
    }



})

const ordermodel = new mongoose.model("order", scm)
module.exports = ordermodel