import express from "express";
import {
  createNews,
  deleteNewsById,
  getNews,
  getNewsById,
  verifyTokenMiddleware,
} from "../News/NewsService.js";
import { createUser, loginUser, verifyToken } from "../User/UserService.js";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

//getNews
router.get("/dev/v1/news", async (req, res) => {
  try {
    const news = await getNews();
    res.json(news);
  } catch (error) {
    console.log(error);
    res.status(error + "Gagal Mengambil Berita.");
  }
});

//getnewsbyid
router.get("/dev/v1/news/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await getNewsById(newsId);
    res.json(news);
  } catch (error) {
    console.log(error);
    res.status(error + "Gagal");
  }
});

//postNews
router.post(
  "/dev/v1/addNews",
  verifyTokenMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, desc } = req.body;
      const imageBuffer = req.file.buffer;
      //convert into blob
      const image = Buffer.from(imageBuffer).toString("base64");

      const newNews = await createNews(title, desc, image);
      res
        .status(201)
        .json({ message: "SUKSES MENAMBAHKAN BERITA", news: newNews });
    } catch (error) {
      res.status(500).json({ error: "Gagal Membuat Berita" });
    }
  }
);

//deleteNews
router.delete(
  "/dev/v1/deleteNews/:id",
  verifyTokenMiddleware,
  async (req, res) => {
    try {
      const newsId = req.params.id;
      const deleteNews = await deleteNewsById(newsId);
      if (!deleteNews) {
        res.status(404).json({ error: "Error" });
      }
      res.json({ message: `Berita dengan Id ${newsId} berhasil dihapus.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Gagal menghapus Data" });
    }
  }
);

//USER CONTROLLER

// Register a new user
router.post("/dev/v1/register", async (req, res) => {
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
router.post("/dev/v1/login", async (req, res) => {
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
router.get("/dev/v1/test", async (req, res) => {
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

export default router;
