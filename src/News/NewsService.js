import News from "./NewsModel.js";

//Create News Service
export const createNews = async (title, desc, image) => {
  try {
    const newNews = new News({
      title: title,
      desc: desc,
      image: image,
    });

    await newNews.save();
    return newNews;
  } catch {
    res.status(500).json({ error: "Failed Creating News" });
  }
};

//get News
export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    return news;
  } catch (error) {
    res.status(500).json({ error: "Failed to get New news" });
  }
};

//get NewsById
export const getNewsById = async (newsId, res) => {
  try {
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }
    return news;
  } catch (error) {
    return error;
  }
};

//delete News
export const deleteNewsById = async (newsId) => {
  try {
    const deleteNews = await News.findByIdAndDelete(newsId);
    return deleteNews;
  } catch (error) {
    throw new Error("failed to delete News, contact support :)");
  }
};