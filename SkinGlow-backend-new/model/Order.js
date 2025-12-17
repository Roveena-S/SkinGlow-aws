const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [{
    productName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    doorNo: String,
    city: String,
    district: String,
    state: String,
    country: String,
    pincode: String,
    mobile: String,
    email: String
  },
  paymentMode: { type: String, required: true },
  upiId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);