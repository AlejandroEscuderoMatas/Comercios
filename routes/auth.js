const express = require("express")
const { registerUser, loginUser, loginCommerce }                   = require("../controllers/auth")
const { updateUser, deleteUser }                                = require("../controllers/user")
const { validatorRegisterUser, validatorLoginUser } = require("../validators/auth")
const { validatorCreateUser, validatorGetUser, checkUniquesUser }     = require("../validators/user")
const {authMiddlewareUser}                                = require("../middleware/session")
const checkRol                                      = require("../middleware/rol")
const router = express.Router()

//LOGIN UN COMERCIO
/**
 * @openapi
 * /api/auth/login/commerce:
 *  post:
 *      tags:
 *      - Aux
 *      summary: Login commerce in the System
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the jwt for the commerce, just used for testing while developing the api
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/login/commerce",  loginCommerce)

//REGISTRAR UN USUARIO
/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - Public User
 *      summary: Create new user in the System
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the jwt for the user, creates it in db
 *          '403':
 *              description: Errors in parameters
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/register", checkUniquesUser, validatorRegisterUser, registerUser)

//LOGIN DE USUARIO
/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - Registered User
 *      summary: Get the access jwt of a user
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the jwt for the user
 *          '403':
 *              description: Errors in parameters or not found user
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/login", validatorLoginUser, loginUser)

//EDITAR TU USUARIO
/**
 * @openapi
 * /api/auth/update/{id}:
 *  put:
 *      tags:
 *      - Registered User
 *      summary: Edit a user, required jwt that authentifies you can only edit your own user
 *      description: ''
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Get the user edited
 *          '403':
 *              description: Errors in parameters or not found user
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/update/:id", authMiddlewareUser, checkUniquesUser, validatorGetUser, validatorCreateUser, updateUser)

//ELIMINAR TU USUARIO
/**
 * @openapi
 * /api/auth/delete/{id}:
 *  delete:
 *      tags:
 *      - Registered User
 *      summary: Delete a user, required jwt that authentifies you can only delete your own user
 *      description: 'Its just a logicall delete, so the data can be restored from bd'
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be deleted
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Success
 *          '403':
 *              description: Errors in parameters or not found user
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/delete/:id", authMiddlewareUser, validatorGetUser, deleteUser)

//CALIFICA UNA WEB
//router.put("/vote/:id", authMiddleware, validatorGetUser, deleteUser)

module.exports = router