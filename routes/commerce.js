const express = require("express")
const router = express.Router()

const { getCommerces, getCommerce, createCommerce, updateCommerce, deleteCommerce } = require("../controllers/commerce")

const {validatorCreateCommerce, validatorGetCommerce, checkUniquesCommerce} = require("../validators/commerce")
const {authMiddlewareUser} = require("../middleware/session")
const checkRol       = require("../middleware/rol")

router.get("/", authMiddlewareUser, checkRol(["admin"]), getCommerces)

router.get("/:id", authMiddlewareUser, checkRol(["admin"]), validatorGetCommerce, getCommerce)

router.post("/", authMiddlewareUser, checkRol(["admin"]), checkUniquesCommerce, validatorCreateCommerce, createCommerce)

//authMiddleware: que tenga el token de sesion
//checkRol: comprobar que somos rol admin
router.put("/:id", authMiddlewareUser, checkRol(["admin"]), checkUniquesCommerce, validatorGetCommerce, validatorCreateCommerce, updateCommerce)

router.delete("/:id", authMiddlewareUser, checkRol(["admin"]), validatorGetCommerce, deleteCommerce)

module.exports = router