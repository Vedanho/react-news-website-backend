const { Router } = require("express")
const { userControllers } = require("../controllers/users.controllers")

const router = Router()

router.post("/user", userControllers.createUser);
router.get("/user", userControllers.getUsers);
router.patch("/user/:id", userControllers.updateUser)
router.delete("/user/:id", userControllers.deleteUser)
router.post("/user/login", userControllers.login)

module.exports = router