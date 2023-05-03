const express = require("express")
const router = express.Router()
const { getUsers, getUser, createUser, updateUser, deleteUser, getUsersMerchant } = require("../controllers/user")
const {validatorGetUser, validatorCreateUser, checkUniquesUser} = require("../validators/user")
const {authMiddlewareCommerce, authMiddlewareUser} = require("../middleware/session")

router.get("/", getUsers)

router.get("/:id", validatorGetUser, getUser)

router.post("/", checkUniquesUser, validatorCreateUser, createUser)


router.put("/:id", checkUniquesUser, validatorGetUser, validatorCreateUser, updateUser)

router.delete("/:id", validatorGetUser, deleteUser)

//DELETE ONE COMMERCE
/**
 * @openapi
 * /api/user/search/{city}:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get all users in the System by the city of the commerce that searches, and that have the same interests as in its webpage, and have the accept parameter of user to true, verify only commerce can do this
 *      description: ''
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: city yo filter search
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, not found commerce
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/search/:city", authMiddlewareCommerce, getUsersMerchant)

module.exports = router