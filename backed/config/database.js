const mongoose=require("mongoose");
require("dotenv").config()
exports.connectdb=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("database connected succesfully")
    }).catch((error)=>{
        console.log("error acure in dattabase connectivity and error is",error)
    })
}