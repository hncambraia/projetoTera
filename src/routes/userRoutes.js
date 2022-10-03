const express = require("express")
const router = express.Router()

const controller = require("../controllers/userController")

router.get("/all", controller.getAll)
router.get("/:login", controller.getUser)
router.post("/validausuario", controller.validaUsuario)
router.post("/create", controller.createUser)
router.delete("/:login", controller.deleteUser)
router.patch("/:login", controller.alteraNome)
router.put("/:login", controller.alteraDados)

module.exports = router
