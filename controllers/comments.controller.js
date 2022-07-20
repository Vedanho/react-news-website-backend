const Comment = require("../models/Comment.model");

module.exports.commentControllers = {
  createComment: async (req, res) => {
    try {
      const { user, text, news } = req.body;

      const newComment = await Comment.create({
        user,
        text,
        news,
      });

      return res.json(newComment);
    } catch (error) {
      return res.status(401).json({error: 'CONTROLLER' + ' ' + error.message});
    }
  },
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      return res.json(comments);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
  updateComment: async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
      });
      const newComment = await Comment.findById(req.params.id);
      return res.json(newComment);
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params

      const comment = await Comment.findById(id)

      if (comment.user.toString() === req.user.id) {
        console.log(123);
        await comment.remove()
      }
     
      return  res.json("Комментарий удалён");
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
  getCommentsByNew: async (req, res) => {
    try {
     const comments = await Comment.find({news: req.params.id}).populate("user")
      return res.json(comments)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
};
