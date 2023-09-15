import mongoose from "mongoose";

const newsModel = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  date: {
    type: Date,
    default: Date.now,
  },
  desc: String,
  image: String, // Add this field to store the image path
});

const News = mongoose.model("News", newsModel);

export default News;
