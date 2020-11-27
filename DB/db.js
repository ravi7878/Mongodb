const mongoose = require("mongoose");

const URI =
  "mongodb+srv://ravi7878:ravi7878@cluster0.2qlxe.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (err) {
    console.error("Error", err.message);
  }
};

module.exports = connectDB;
