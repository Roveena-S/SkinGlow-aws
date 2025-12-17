const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectdb = async () => {
    try {
        console.log("Attempting to connect to MongoDB Atlas...");
        
        await mongoose.connect(process.env.MONGO_URL,{
              serverSelectionTimeoutMS: 10000,
        });
        
        console.log("✅ Database Connected Successfully");   
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);   
    }
};

module.exports = connectdb;