const New = require("../models/New..model");

module.exports.newControllers = {
  createNew: async (req, res) => {
    try {
      const { picture, title, text, category } = req.body;

      const createdNew = await New.create({
        picture,
        title,
        text,
        category,
        user: req.param.id,
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
      return res.json(updatedNew);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  deleteNew: async (req, res) => {
    try {
      New.findByIdAndRemove(req.params.id);
      return res.json("Новость удалена");
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
};
