const express = require("express")
const router = express.Router()

const controller = require("../controllers/feedController")

router.get("/all", controller.getAll)
router.get("/:ingrediente", controller.getReceita)
router.post("/create", controller.createReceita)
router.patch("/:titulo", controller.alteraTitulo)
router.put("/:titulo", controller.alteraReceita)

module.exports = router
