const express=require("express")
const database=require("./config/database");
database.connectdb()
const app=express();
app.listen(3000,()=>{
    console.log("app is running")
})
