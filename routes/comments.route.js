const { Router } = require("express");
const { commentControllers } = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/comment", authMiddleware, commentControllers.createComment);
router.get("/comment", commentControllers.getComments);
router.patch("/comment/:id", commentControllers.updateComment);
router.delete("/comment/:id", authMiddleware, commentControllers.deleteComment);
router.get("/comment/:id", commentControllers.getCommentsByNew)

module.exports = router