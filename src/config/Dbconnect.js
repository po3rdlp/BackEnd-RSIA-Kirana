import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDb = async () => {
  try {
    const dbUrl = process.env.DB_URL;

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database.");
  } catch (error) {
    console.log("Not Connected");
  }
};

export default ConnectDb;
