const mongoose = require("mongoose");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
    console.error("STACK:");
    console.error(err.stack);
    process.exit(1);
  }
};

module.exports = connectDB;