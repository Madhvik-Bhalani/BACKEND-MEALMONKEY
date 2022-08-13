const express = require("express")
const router = new express.Router();
const foodmodel=require("../Model/foodmodel")

router.post("/add",async(req,res)=>{
    try {
        const data=new foodmodel({
            name: req.body.name,
            veg: req.body.veg,
            price: req.body.price,
            description: req.body.description,
            seller: req.body.seller,
            quantity: req.body.quantity,
            img: req.body.img
        })
        await data.save()
        res.status(201).json("Product Added Successfully.!")
    } catch (e) {
        
        res.status(400).json(`${e.message}`)
        
    }
})

// fetch product
router.get("/getproducts",async(req,res)=>{
    try {
        const data=await foodmodel.find({})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).json({getcontact_err:`${error}`})
    }
})

module.exports=router