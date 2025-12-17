const Order = require("../model/Order");

exports.createOrder = async(req, res) => {
    const { user, items, totalAmount, shippingAddress, paymentMode, upiId } = req.body;
    console.log("Order creation attempt:", { user, items, totalAmount, shippingAddress, paymentMode });
    try {
        const newOrder = new Order({ user, items, totalAmount, shippingAddress, paymentMode, upiId });
        await newOrder.save();
        console.log("Order created successfully");
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error("Error creating order:", error.message);
        console.error("Full error:", error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
}

exports.getOrders = async(req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: 'Server error' });
    }
}