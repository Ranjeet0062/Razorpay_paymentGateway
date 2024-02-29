const express=require("express")
const paymentrouter =require("./routes/payment")
const cors=require("cors");
const database=require("./config/database");
database.connectdb()
const app=express();
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:5173' }));
app.use("/payment",paymentrouter)

app.listen(3000,()=>{
    console.log("app is running")
})
