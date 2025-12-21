const productModel = require('../models/product.models');
const Razorpay = require('razorpay');
const paymentModel = require('../models/Payment');
const crypto = require('crypto');

function getRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    console.error('Razorpay credentials missing: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET');
    return null;
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}


async function createOrder(req, res) {
  try {
    const cartAmount = Number(req.body?.amount);
    let amountInRupees = cartAmount && cartAmount > 0 ? cartAmount : null;

    if (!amountInRupees) {
      const product = await productModel.findOne();
      if (!product) return res.status(404).json({ message: "Product not found" });
      amountInRupees = Number(product.price);
      if (!amountInRupees || isNaN(amountInRupees)) {
        return res.status(400).json({ message: "Invalid product price" });
      }
    }

    const currency = 'INR';

    const options = {
      amount: Math.round(amountInRupees * 100),
      currency,
      receipt: `receipt_${Date.now()}`
    };

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return res.status(500).json({ message: 'Razorpay is not configured on the server' });
    }
    const order = await razorpay.orders.create(options);

    await paymentModel.create({
      orderId: order.id,
      amount: amountInRupees,
      currency,
      status: 'pending',
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
}


async function verifyPayment(req, res) {
  try {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    if (!razorpayOrderId || !razorpayPaymentId || !signature) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === signature;

    await paymentModel.updateOne(
      { orderId: razorpayOrderId },
      {
        status: isValid ? 'SUCCESS' : 'FAILED',
        paymentId: razorpayPaymentId,
        signature
      },
      { upsert: false }
    );

    res.status(200).json({ success: isValid });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Verification error' });
  }
}

module.exports = {
  createOrder,
  verifyPayment,
};