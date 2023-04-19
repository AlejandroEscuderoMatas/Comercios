const express = require("express")
const router = express.Router()
const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/user")
const {validatorGetUser, validatorCreateUser} = require("../validators/user")
const authMiddleware = require("../middleware/session")

router.get("/", getUsers)

router.get("/:id", validatorGetUser, getUser)

router.post("/", validatorCreateUser, createUser)

//authMiddleware: que tenga el token de sesion
//checkRol: comprobar que somos rol admin
router.put("/:id", validatorGetUser, validatorCreateUser, updateUser)

router.delete("/:id", validatorGetUser, deleteUser)

module.exports = router