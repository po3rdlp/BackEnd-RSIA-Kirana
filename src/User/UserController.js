import express from "express";
import { createUser, loginUser, verifyToken } from "./UserService.js";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: true }));

// Register a new user
userRouter.post("/dev/v1/register", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const result = await createUser(userName, password);

  if (result && result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(201).json({ message: "User registered successfully" });
});

// Login endpoint
userRouter.post("/dev/v1/login", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const result = await loginUser(userName, password);

  if (result.error) {
    return res.status(401).json({ error: result.error });
  }

  return res.status(200).json({ token: result.token });
});

//pingpong
userRouter.get("/dev/v1/test", async (req, res) => {
  const token = req.headers.authorization;

  const decodedToken = verifyToken(token, TOKEN_SECRET);

  if (decodedToken) {
    return res
      .status(200)
      .json({ message: "Token is valid", user: decodedToken });
  } else {
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
});

export default userRouter;
