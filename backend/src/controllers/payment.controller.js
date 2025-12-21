const productModel = require('../models/product.model');
const Razorpay = require('razorpay');
const paymentModel = require('../models/payment.model');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ...existing code...
async function createOrder(req, res) {
  try {
    // Use cart total if provided
    const cartAmount = Number(req.body?.amount);
    let amountInRupees = cartAmount && cartAmount > 0 ? cartAmount : null;

    if (!amountInRupees) {
      const product = await productModel.findOne();
      if (!product) return res.status(404).json({ message: "Product not found" });
      amountInRupees = product.price.amount;
    }

    const currency = 'INR'; 

    const options = {
      amount: Math.round(amountInRupees * 100), // paise
      currency,
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    await paymentModel.create({
      orderId: order.id,
      price: { amount: amountInRupees, currency },
      status: 'PENDING',
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
}
// ...existing code...

async function verifyPayment(req, res) {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    const crypto = require('crypto');

    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).send("Invalid signature");
    }

    const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.paymentId = razorpayPaymentId;
    payment.signature = signature;
    payment.status = 'COMPLETED';
    await payment.save();

    res.json({ status: "success" });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying payment');
  }
}

module.exports = {
  createOrder,
  verifyPayment,
};
