const Comment = require("../models/Comment.model");
const News = require("../models/News.model");

module.exports.newControllers = {
  createNew: async (req, res) => {
    try {
      const { title, text, category } = req.body;
  
      const createdNew = await News.create({
        picture: req.file.path,
        title,
        text,
        category,
      });

      return res.json(createdNew);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  getNews: async (req, res) => {
    try {
      const news = await News.find();
      return res.json(news);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  updateNew: async (req, res) => {
    try {
      const updatedNew = await News.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
      });
      const improvedNew = await News.findById(req.params.id);
      return res.json(improvedNew);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  deleteNew: async (req, res) => {
    try {
      await News.findByIdAndRemove(req.params.id);
      return res.json("Новость удалена");
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  getNewsById: async (req, res) => {
    try {
      const definiteNews = await News.findById(req.params.id).lean();
      if (!definiteNews) {
        return res.status(404).json("Новость не найдена")
      }
      const comments = await Comment.find({news: req.params.id})
      
      definiteNews.comments = comments
      return res.json(definiteNews);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
};
