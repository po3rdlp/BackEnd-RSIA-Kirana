import express from "express";
import {
  createNews,
  deleteNewsById,
  getNews,
  getNewsById,
} from "./NewsService.js";
import multer from "multer";

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
router.post("/dev/v1/addNews", upload.single("image"), async (req, res) => {
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
});

//deleteNews
router.delete("/dev/v1/deleteNews/:id", async (req, res) => {
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
});

export default router;
