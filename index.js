// doteenv configfile & connection_file
require("dotenv").config()
const cors=require("cors")
require("./Model/conn")

// express app
const express=require("express")
const app=express();

// for req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// cors

app.use(cors({credentials: true,origin: 'http://localhost:3000'}))

// auth routes=>signup&signin
app.use("/auth",require("./Routes/auth"))
app.use("/details",require("./Routes/getdetails"))
app.use("/food",require("./Routes/food"))
app.use("/cart",require("./Routes/cart"))
app.use("/yourorder",require('./Routes/yourorder'))


const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Backend Server Start At=>${port}`);
})