const express = require("express")
const router = express.Router()
const { getWebs, getWeb, searchWeb, createWeb, updateWeb, deleteWeb, createText, uploadImage, punctuateWeb } = require("../controllers/web")
const { validatorCreateWeb, validatorGetWeb, checkUniqueWeb, checkAccessWeb } = require("../validators/web")
const { authMiddlewareCommerce, authMiddlewareUser } = require("../middleware/session")
const uploadMiddleware = require("../utils/handleStorage")

router.get("/", getWebs)

router.get("/:id", validatorGetWeb, getWeb)

router.get("/search/:city", searchWeb)

router.get("/search/:city/:activity", searchWeb)

router.post("/", authMiddlewareCommerce, checkUniqueWeb,  validatorCreateWeb, createWeb)

//authMiddleware: que tenga el token de sesion
//checkRol: comprobar que somos rol admin
router.put("/:id", authMiddlewareCommerce, checkAccessWeb, validatorGetWeb, validatorCreateWeb, updateWeb)

router.delete("/:id", authMiddlewareCommerce, checkAccessWeb, validatorGetWeb, deleteWeb)

router.post("/texts/:id", authMiddlewareCommerce, checkAccessWeb, createText)

router.post("/photos/:id", authMiddlewareCommerce, checkAccessWeb, uploadMiddleware.single("image"), uploadImage)

router.patch("/:id", authMiddlewareUser, validatorGetWeb, punctuateWeb)

module.exports = router