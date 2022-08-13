const mongoose = require("mongoose")


var d1 = new Date(),
    d2 = new Date(d1);
d2.setMinutes(d1.getMinutes() + 30);
const scm = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
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
    hno: {
        type: String
    },
    area: {
        type: String
    },
    landmark: {
        type: String
    },
    cod: {
        type: String
    },
    city: {
        type: String
    },
    rno: {
        type: String,
        default: Math.random().toString(36).substr(2)
    },
    vno: {
        type: Number,
        default: Math.ceil(Math.random() * 1000000)
    },
    date: {

        type: String,
        default: new Date().toLocaleDateString()
    },
    ordertime: {
        type:String,
        default:d1.toLocaleTimeString()
    },
    deliverytime: {
        type:String,
        default:d2.toLocaleTimeString() 
    }



})

const ordermodel = new mongoose.model("your order", scm)
module.exports = ordermodel