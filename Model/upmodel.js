const mongoose=require("mongoose")
const unival=require("mongoose-unique-validator")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


const scm=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"minimum length is 3"],
        maxlength:[25,"maximum length is 25"],

    },
    mno:{
        unique: true,
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
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("email is not valid");
            }
        }
        
    },
    pass: {
        type: String,
        required: true,
        minlength:3
        
    },
    cpass:{
        type: String

    },
    date: {
        type: String,
        default: new Date().toLocaleString()
    },
})
scm.plugin(unival)

scm.pre("save",async function(next){
    try {
        if(this.isModified("pass"))
        {
            this.pass=await bcrypt.hash(this.pass,10)
            next();
        }
    } catch (error) {
        console.log(`password hashing err`+error);
    }
})

scm.methods.gentoken=async function(){
    try {
        const token=jwt.sign({_id:this._id},`%$^&%&*^&*HJjhgjgsdjfhckdho<JGJYFHF6464*/465465sdiu*&*(#$@6566d5f6`)
        return token;
    } catch (error) {
        
        console.log(`json token genrate err`+error);
    }
}
const upmodel=new mongoose.model("signup",scm)

module.exports=upmodel;