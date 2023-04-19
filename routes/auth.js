const express = require("express")
const { registerUser, loginUser }                   = require("../controllers/auth")
const { updateUser }                                = require("../controllers/user")
const { validatorRegisterUser, validatorLoginUser } = require("../validators/auth")
const { validatorCreateUser, validatorGetUser }     = require("../validators/user")
const authMiddleware                                = require("../middleware/session")
const checkRol                                      = require("../middleware/rol")
const router = express.Router()

//REGISTRAR UN USUARIO
router.post("/register", validatorRegisterUser, registerUser)

//LOGIN DE USUARIO
router.post("/login", validatorLoginUser, loginUser)

//EDITAR TU USUARIO
router.put("/update/:id", authMiddleware, validatorGetUser, validatorCreateUser, updateUser)

//ELIMINAR TU USUARIO
router.put("/delete/:id", authMiddleware, validatorGetUser, validatorCreateUser, updateUser)

module.exports = router