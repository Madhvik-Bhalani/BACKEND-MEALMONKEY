const express=require("express")
const router=new express.Router();
const upmodel=require("../Model/upmodel")
const validuser=require("../Middleware/validuser")
router.get("/getcontact",validuser,async(req,res)=>{
    try {
        const data=await upmodel.findOne({_id:req.id})
        res.status(200).send(data);
    } catch (error) {
        res.status(400).json({getcontact_err:`${error}`})
    }
})

module.exports=router;