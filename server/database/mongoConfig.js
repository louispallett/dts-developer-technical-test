const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

if (!mongoDB) {
    console.error("MONGODB_URI environment variable is not defined!");
    process.exit(1); 
}

async function main() {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    }
}

main();

module.exports = mongoose;