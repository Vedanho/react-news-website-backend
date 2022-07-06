const Category = require("../models/Category.model");

module.exports.categoryControllers = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({
        name,
      });
      res.json(newCategory);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      });
      const newCategory = await Category.findById(req.params.id);
      return res.json(newCategory);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndRemove(req.params.id);
      return res.json("Категория удалена");
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
};
