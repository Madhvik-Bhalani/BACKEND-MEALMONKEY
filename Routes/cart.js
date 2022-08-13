const express = require("express")
const router = new express.Router();
const cartmodel = require("../Model/cartmodel")
const foodmodel = require("../Model/foodmodel")
const validuser = require("../Middleware/validuser")

router.post("/add", validuser, async (req, res) => {
    try {
        const data = await foodmodel.findOne({ _id: req.body.id })
        const cartdata = new cartmodel({
            userid: req.id, //reference
            name: data.name,
            veg: data.veg,
            price: data.price,
            description: data.description,
            seller: data.seller,
            quantity: data.quantity,
            img: data.img
        })
        finaldata = await cartdata.save()
        res.status(201).json("procted added to cart.!")
    } catch (e) {

        res.status(400).json(`${e.message}`)
    }
})
// fetch product
router.get("/getcartproducts", validuser, async (req, res) => {
    try {
        const data = await cartmodel.find({ userid: req.id })
        // console.log(data);
        let tdata = await cartmodel.find({ userid: req.id })
        // console.log("tdata"+tdata);\
        let newdata = tdata.reduce((accum, elem) => {
            let val = elem.price
            return accum + val
        }, 0)//calculate cart total
        await cartmodel.updateMany({ userid: req.id }, { $set: { cartamt: newdata } }, { new: true })//update cart total
        const updateddata = await cartmodel.find({ userid: req.id })
        // console.log(updateddata); //get updated obj
        res.status(200).json(updateddata)



    } catch (error) {
        res.status(400).json(`${error}`)
    }
})
// delete product
router.post("/deleteproduct", validuser, async (req, res) => {
    try {
        const data = await cartmodel.findOne({ _id: req.body.id })
        if (data.userid == req.id) {
            const delrecord = await cartmodel.deleteOne({ _id: req.body.id })
            res.status(200).json(delrecord);
        }
        else {

            res.status(400).json("You Have No Access To Delete This");
        }
    } catch (error) {
        res.status(400).json(`${error}`)
    }
})
// delete all product
router.post("/deleteall", validuser, async (req, res) => {
    try {

        const delrecord = await cartmodel.deleteMany({ userid: req.id })
        res.status(200).json(delrecord);

    } catch (error) {
        res.status(400).json(`${error}`)
    }
})
// plus product
router.post("/plus", validuser, async (req, res) => {
    try {
        const data = await cartmodel.findOne({ _id: req.body.id })
        const fooditem = await foodmodel.findOne({ name: data.name })

        if (data.userid == req.id) {
            const udata = await cartmodel.findByIdAndUpdate({ _id: req.body.id }, { $set: { quantity: data.quantity + 1 } }, { new: true }) //updated qty

            const fdata = await cartmodel.findByIdAndUpdate({ _id: req.body.id }, { $set: { price: (udata.quantity * fooditem.price) } }, { new: true }) //update price with updated qty

            let tdata = await cartmodel.find({ userid: req.id })
            // console.log("tdata"+tdata);\
            let newdata = tdata.reduce((accum, elem) => {
                let val = elem.price
                return accum + val
            }, 0)//calculate cart total

            await cartmodel.updateMany({ userid: req.id }, { $set: { cartamt: newdata } }, { new: true })//update cart total
            const updateddata = await cartmodel.findOne({ _id: req.body.id })
            // console.log(updateddata); //get updated obj
            res.status(200).json(updateddata)
        }
        else {

            res.status(400).json("You Have No Access To plus This item");
        }
    } catch (error) {
        res.status(400).json(`${error}`)
    }
})
// minus product
router.post("/minus", validuser, async (req, res) => {
    try {
        const data = await cartmodel.findOne({ _id: req.body.id })
        const fooditem = await foodmodel.findOne({ name: data.name })
        if (data.userid == req.id) {
            const udata = await cartmodel.findByIdAndUpdate({ _id: req.body.id }, { $set: { quantity: data.quantity - 1 } }, { new: true })

            // console.log("data" + udata);

            const fdata = await cartmodel.findByIdAndUpdate({ _id: req.body.id }, { $set: { price: (udata.quantity * fooditem.price) } }, { new: true })

            let tdata = await cartmodel.find({ userid: req.id })
            // console.log("tdata"+tdata);\
            let newdata = tdata.reduce((accum, elem) => {
                let val = elem.price
                return accum + val
            }, 0)//calculate cart total
            await cartmodel.updateMany({ userid: req.id }, { $set: { cartamt: newdata } }, { new: true })//update cart total
            const updateddata = await cartmodel.findOne({ _id: req.body.id })
            // console.log(updateddata); //get updated obj
            res.status(200).json(updateddata)

        }
        else {

            res.status(400).json("You Have No Access To plus This item");
        }
    } catch (error) {
        res.status(400).json(`${error}`)
    }
})

// put qty
router.post("/putqty", validuser, async (req, res) => {
    try {

        const udata = await cartmodel.updateMany({ userid: req.id }, { $set: { totalqty: req.body.qty } })

        res.status(200).json(udata)


    } catch (error) {
        res.status(400).json(`${error}`)
    }
})

// get qty
router.get("/getqty", validuser, async (req, res) => {
    try {

        const udata = await cartmodel.findOne({ userid: req.id })

        res.status(200).json(udata)

    } catch (error) {
        res.status(400).json(`${error}`)
    }
})

module.exports = router