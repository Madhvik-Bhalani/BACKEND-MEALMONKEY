const express = require("express")
const router = new express.Router()
const validuser = require("../Middleware/validuser")
const cartmodel = require("../Model/cartmodel")
const ordermodel = require("../Model/ordermodel")

router.post("/", validuser, async (req, res) => {
    try {
        if (req.body.cod === "select payment mode") {
            res.status(400).json("please select your payment mode")
        } else {
            if (req.body.city === "city") {
                res.status(400).json("please select your city")

            } else {
                const cartdata = await cartmodel.find({ userid: req.id })
                cartdata.map(async (elem) => {

                    const data = new ordermodel({
                        userid: req.id, //reference
                        name: elem.name,
                        veg: elem.veg,
                        price: elem.price,
                        description: elem.description,
                        seller: elem.seller,
                        quantity: elem.quantity,
                        img: elem.img,
                        cartamt: elem.cartamt,
                        totalqty: elem.totalqty,


                        hno: req.body.hno,
                        area: req.body.area,
                        landmark: req.body.landmark,
                        cod: req.body.cod,
                        city: req.body.city,

                    })
                    await data.save()
                })
                const orderdata = await ordermodel.find({ userid: req.id })
                await cartmodel.deleteMany({ userid: req.id })
                res.status(201).json(orderdata)

            }
        }
    } catch (e) {
        res.status(400).json(`${e}`)
    }
})

// get products
router.get("/getorders", validuser, async (req, res) => {
    try {
        const data = await ordermodel.find({ userid: req.id })  
        console.log("adtaa"+data); 
    res.status(200).send(data);
    } catch (error) {
        res.status(400).json(`${error}` )
    }
})

module.exports = router;