const { instance } = require("../config/razorpayconfig")
const crypto=require("crypto")
exports.capaturePayment = async (req, res) => {
    try {
        console.log(req.body.totalAmount)
        const totalAmount = req.body.totalAmount
        console.log(req.body.totalAmount)
        const currency = "USD"
        const options = {
            amount: totalAmount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
        }
        console.log(req.body.totalAmount)
        try {
            const orederResponse = await instance.orders.create(options)
            return res.status(200).json({
                success: true,
                data: orederResponse,
                message: "order created success fully"
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `something went wrong while instanceing a order ${error}`
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong while captureing payment ${error}`
        })
    }
}
exports.verifypayment = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");
        console.log("before if")
        if (expectedSignature === razorpay_signature) {
            return res.status(200).json({
                success: true,
                message: "successfully verifyed payment"
            })

        } else {
            return res.status(200).json({
                success: false,
                message: "payment verifyed failed"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong while verfiying a paymen${error}`
        })
    }
}