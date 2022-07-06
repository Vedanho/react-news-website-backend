const { Router } = require("express");
const { categoryControllers } = require("../controllers/category.controllers");

const router = Router();

router.post("/category", categoryControllers.createCategory);
router.get("/category", categoryControllers.getCategory)
router.patch("/category/:id", categoryControllers.updateCategory)
router.delete("/category/:id", categoryControllers.deleteCategory)

module.exports = router