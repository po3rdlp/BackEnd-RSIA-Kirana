import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./UserModel.js";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

//Create User
export const createUser = async (userName, password) => {
  try {
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return { error: "Username is already taken" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  } catch (err) {
    console.error("Error during user registration:", err);
    return { error: "An error occurred during registration" };
  }
};

export const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error("Token is missing");
    }

    const decodedToken = generateToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null;
  }
};

export const loginUser = async (userName, password) => {
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return { error: "Invalid username or password" };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = generateToken(user);
      return { token };
    } else {
      return { error: "Invalid username or password" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "error tidak diketahui saat login." };
  }
};
