const News = require("../models/News..model");

module.exports.newControllers = {
  createNew: async (req, res) => {
    try {
      const { picture, title, text, category, user } = req.body;

      const createdNew = await News.create({
        picture,
        title,
        text,
        category,
        user,
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
      const definiteNews = await News.findById(req.params.id);
      return res.json(definiteNews);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
};
