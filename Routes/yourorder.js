const express = require("express")
const router = new express.Router()
const validuser = require("../Middleware/validuser")
const cartmodel = require("../Model/cartmodel")
const ordermodel = require("../Model/ordermodel")
const upmodel = require("../Model/upmodel")

router.post("/", validuser, async (req, res) => {
    try {
        if (req.body.cod === ""||req.body.city===""||req.body.hno===""||req.body.area===""||req.body.pin==="") {
            res.status(400).json("All Fields Are Required")
        } else {
            
                const cartdata = await cartmodel.find({ userid: req.id })
                cartdata.map(async (elem) => {
                    var d1 = new Date(),
                        d2 = new Date(d1);
                    d2.setMinutes(d1.getMinutes() + 30);
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
                        onum: Math.round(Math.random() * 100000000000),
                        ordertime: d1.toLocaleString(),
                        deliverytime: d2.toLocaleString()

                    })
                    await data.save()
                })

                await upmodel.updateOne({ _id: req.id }, { $set: { hno: req.body.hno, area: req.body.area, pin: req.body.pin, city: req.body.city,cod:req.body.cod } }, { new: true })

                const orderdata = await ordermodel.find({ userid: req.id })
                await cartmodel.deleteMany({ userid: req.id })
                res.status(201).json(orderdata)

            
        }
    } catch (e) {
        res.status(400).json(`${e}`)
    }
})

// get products
router.get("/getorders", validuser, async (req, res) => {
    try {
        const data = await ordermodel.find({ userid: req.id })
        // console.log("adtaa"+data); 
        res.status(200).send(data);
    } catch (error) {
        res.status(400).json(`${error}`)
    }
})

module.exports = router;