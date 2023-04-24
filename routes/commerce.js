const express = require("express")
const router = express.Router()

const { getCommerces, getCommerce, createCommerce, updateCommerce, deleteCommerce } = require("../controllers/commerce")

const {validatorCreateCommerce, validatorGetCommerce} = require("../validators/commerce")
const authMiddleware = require("../middleware/session")
const checkRol       = require("../middleware/rol")

router.get("/", authMiddleware, checkRol(["admin"]), getCommerces)

router.get("/:id", authMiddleware, checkRol(["admin"]), validatorGetCommerce, getCommerce)

router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateCommerce, createCommerce)

//authMiddleware: que tenga el token de sesion
//checkRol: comprobar que somos rol admin
router.put("/:id", authMiddleware, checkRol(["admin"]), validatorGetCommerce, validatorCreateCommerce, updateCommerce)

router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorGetCommerce, deleteCommerce)

module.exports = router