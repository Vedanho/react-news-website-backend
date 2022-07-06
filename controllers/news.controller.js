const New = require("../models/News..model");

module.exports.newControllers = {
  createNew: async (req, res) => {
    try {
      const { picture, title, text, category, user } = req.body;

      const createdNew = await New.create({
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
      const news = await New.find();
      return res.json(news);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  updateNew: async (req, res) => {
    try {
      const updatedNew = await New.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
      });
      const improvedNew = await New.findById(req.params.id)
      return res.json(improvedNew);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  deleteNew: async (req, res) => {
    try {
      await New.findByIdAndRemove(req.params.id);
      return res.json("Новость удалена");
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
};
