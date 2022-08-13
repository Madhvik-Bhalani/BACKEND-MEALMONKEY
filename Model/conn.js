const mongoose=require("mongoose")

const conn=async()=>{
try {
    await mongoose.connect(`mongodb://localhost:27017/MealMonkey`)
    console.log(`Connection Done.!!`);
} catch (error) {
    console.log(`Connection err`+error);   
}
}

conn()