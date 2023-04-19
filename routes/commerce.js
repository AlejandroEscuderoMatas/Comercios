const express = require("express")
const router = express.Router()
const { getCommerces, getCommerce, createCommerce, updateCommerce, deleteCommerce } = require("../controllers/commerce")
const {validatorCreateCommerce, validatorGetCommerce} = require("../validators/commerce")
const authMiddleware = require("../middleware/session")

router.get("/", getCommerces)

router.get("/:id", validatorGetCommerce, getCommerce)

router.post("/", validatorCreateCommerce, createCommerce)

//authMiddleware: que tenga el token de sesion
//checkRol: comprobar que somos rol admin
router.put("/:id", validatorGetCommerce, validatorCreateCommerce, updateCommerce)

router.delete("/:id", validatorGetCommerce, deleteCommerce)

module.exports = router