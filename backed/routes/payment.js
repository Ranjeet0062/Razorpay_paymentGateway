const express=require("express");
const paymentrouter=express.Router();
const {verifypayment,capaturePayment} =require("../controller/Payment")
paymentrouter.post("/verifyPayment",verifypayment)
paymentrouter.post("/capturePayment",capaturePayment);
module.exports=paymentrouter