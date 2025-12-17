const User = require("../model/User");
const bcrypt = require('bcryptjs');

exports.registerUser = async(req, res) => {
    const { username, email, password, phone } = req.body;
    console.log("Registration attempt:", { username, email, phone });
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        const newUser = new User({ username, email, password, phone });
        await newUser.save();
        console.log("User registered successfully:", username);
        res.status(201).json({ message: 'User registered successfully', user: { username, email } });
    } catch (error) {
        console.error("Error in registration:", error.message);
        console.error("Full error:", error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
}

exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        res.json({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getUsers = async(req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Server error' });
    }
}