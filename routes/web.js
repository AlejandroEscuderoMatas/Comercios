const express = require("express")
const router = express.Router()
const { getWebs, getWeb, searchWeb, createWeb, updateWeb, deleteWeb } = require("../controllers/web")
const { validatorCreateWeb, validatorGetWeb, checkUniqueWeb, checkAccessWeb } = require("../validators/web")
const { authMiddlewareCommerce } = require("../middleware/session")

router.get("/", getWebs)

router.get("/:id", validatorGetWeb, getWeb)

router.get("/search/:city", searchWeb)

router.get("/search/:city/:activity", searchWeb)

router.post("/", authMiddlewareCommerce, checkUniqueWeb, checkAccessWeb,  validatorCreateWeb, createWeb)

//authMiddleware: que tenga el token de sesion
//checkRol: comprobar que somos rol admin
router.put("/:id", authMiddlewareCommerce, checkAccessWeb, validatorGetWeb, validatorCreateWeb, updateWeb)

router.delete("/:id", authMiddlewareCommerce, checkAccessWeb, validatorGetWeb, deleteWeb)

module.exports = router