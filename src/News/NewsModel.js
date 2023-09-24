import mongoose from "mongoose";

const newsModel = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  date: {
    type: Date,
    default: Date.now,
  },
  desc: String,
  image: String,
});

const News = mongoose.model("News", newsModel);

export default News;
