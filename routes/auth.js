const express = require("express")
const { registerUser, loginUser, loginCommerce }                   = require("../controllers/auth")
const { updateUser, deleteUser }                                = require("../controllers/user")
const { validatorRegisterUser, validatorLoginUser } = require("../validators/auth")
const { validatorCreateUser, validatorGetUser, checkUniquesUser }     = require("../validators/user")
const {authMiddlewareUser}                                = require("../middleware/session")
const checkRol                                      = require("../middleware/rol")
const router = express.Router()

//LOGIN UN COMERCIO
router.post("/login/commerce",  loginCommerce)

//REGISTRAR UN USUARIO
router.post("/register", checkUniquesUser, validatorRegisterUser, registerUser)

//LOGIN DE USUARIO
router.post("/login", validatorLoginUser, loginUser)

//EDITAR TU USUARIO
router.put("/update/:id", authMiddlewareUser, checkUniquesUser, validatorGetUser, validatorCreateUser, updateUser)

//ELIMINAR TU USUARIO
router.delete("/delete/:id", authMiddlewareUser, validatorGetUser, deleteUser)

//CALIFICA UNA WEB
//router.put("/vote/:id", authMiddleware, validatorGetUser, deleteUser)

module.exports = router