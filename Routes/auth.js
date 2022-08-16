const express = require("express")
const router = new express.Router();
const upmodel = require("../Model/upmodel")
const bcrypt = require("bcryptjs")
const validuser = require("../Middleware/validuser")
const conmodel = require("../Model/conmodel")

// 1.sign up
router.post("/signup", async (req, res) => {
    try {
        if (req.body.pass === req.body.cpass) {

            const data = new upmodel({
                name: req.body.name,
                email: req.body.email,
                mno: req.body.mno,
                pass: req.body.pass,
            })
            const token = await data.gentoken();
            await data.save();
            await upmodel.updateOne({ email: req.body.email }, { $set: { token: token } }, { new: true })
            res.status(201).json(token)
        } else {
            res.status(400).json("detail does not match" )
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// 2.signin
router.post("/signin", async (req, res) => {
    try {
        const data = await upmodel.findOne({ email: req.body.email })
        const valid = await bcrypt.compare(req.body.pass, data.pass)
        if (valid) {
            const token = await data.gentoken()
            res.status(200).json(token)
        } else {

            res.status(400).json("your detail does not match")
        }
    } catch (error) {
        res.status(400).json("Your Account Does Not Exist.Please signup")
    }
})

// 3.contact
router.post("/contact", validuser, async (req, res) => {
    try {


        const data = new conmodel({
            userid: req.id,
            name: req.body.name,
            email: req.body.email,
            mno: req.body.mno,
            msg: req.body.msg,
        })
        await data.save();
        res.status(201).json({ Ok: "msg has been sent" })

    } catch (error) {
        res.status(400).json({ contact_err: `${error}` })
    }
})

// 4.change password
router.post("/changepass", validuser, async (req, res) => {
    try {
        data = await upmodel.findOne({ _id: req.id })

        valid = await bcrypt.compare(req.body.opass, data.pass)
        if (valid) {
            if (req.body.npass === req.body.rpass) {
                newpass = await bcrypt.hash(req.body.npass, 10)
                udata = await upmodel.updateOne({ email: data.email }, { $set: { pass: newpass } })
                res.status(200).json(udata)
            }
            else {
                res.status(400).json("new password and re-type password does not match")
            }
        } else {
            res.status(400).json("old password does not match")
        }
    } catch (e) {
        res.status(400).json(e.message)

    }
})

module.exports = router