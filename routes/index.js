const { Router } = require("express");

const router = Router();

router.use(require("./new.routes"));
router.use(require("./category.routes"));

module.exports = router;
