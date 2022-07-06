const { Router } = require("express");
const { newControllers } = require("../controllers/new.controllers");

const router = Router();

router.post("/new", newControllers.createNew);
router.get("/new", newControllers.getNews);
router.patch("/new/:id", newControllers.updateNew);
router.delete("/new/:id", newControllers.deleteNew);

module.exports = router
