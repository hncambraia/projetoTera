const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.get("/", controller.getAll);
router.get("/:id", controller.getUser);
router.post("/validausuario", controller.validaUsuario);
router.post("/", controller.createUser);
router.delete("/:login", controller.deleteUser);
router.patch("/:login", controller.alteraNome);
router.put("/:login", controller.alteraDados);

module.exports = router;
