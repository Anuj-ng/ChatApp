const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("MongoDB connected successfully");
    });//dont use await and then together, it is redundant. You can choose either one. If you use await, you can simply write:
    // await mongoose.connect(process.env.MONGO_URL);
    // console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  } 
};

module.exports = connectDB;
