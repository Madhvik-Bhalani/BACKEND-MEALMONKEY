const mongoose=require("mongoose")
const unival=require("mongoose-unique-validator")
const validator=require("validator")



const scm=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"upmodel"
    },
    name:{
        type:String,
        required:true,
        minlength:[3,"minimum length is 3"],
        maxlength:[25,"maximum length is 25"],

    },
    mno:{
        type:Number,
        required:true,
        validate(val)
        {
            if(!(val.toString().length==10))
            {
                throw new Error("mobile number must be 10 digit");
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("email is not valid");
            }
        }
        
    },
   msg:{
    type:String,
    required:true
   },
    date: {
        type: String,
        default: new Date().toLocaleString()
    },
})
scm.plugin(unival)


const conmodel=new mongoose.model("contact",scm)

module.exports=conmodel;