const express = require("express")
const router = express.Router()

const { getCommerces, getCommerce, createCommerce, updateCommerce, deleteCommerce } = require("../controllers/commerce")

const {validatorCreateCommerce, validatorGetCommerce, checkUniquesCommerce} = require("../validators/commerce")
const {authMiddlewareUser} = require("../middleware/session")
const checkRol       = require("../middleware/rol")

//GET ALL COMMERCES
/**
 * @openapi
 * /api/commerce:
 *  get:
 *      tags:
 *      - Admin
 *      summary: Get all commerce in the System, verify rol of admin
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, not admin
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", authMiddlewareUser, checkRol(["admin"]), getCommerces)

//GET ONE COMMERCE
/**
 * @openapi
 * /api/commerce/{id}:
 *  get:
 *      tags:
 *      - Admin
 *      summary: Get a commerce in the System by an id, verify rol of admin
 *      description: ''
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be patched
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, not admin
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/:id", authMiddlewareUser, checkRol(["admin"]), validatorGetCommerce, getCommerce)

//GET ONE COMMERCE
/**
 * @openapi
 * /api/commerce:
 *  post:
 *      tags:
 *      - Admin
 *      summary: Create a commerce in the System, verify rol of admin
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, not admin, commerce already created
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authMiddlewareUser, checkRol(["admin"]), checkUniquesCommerce, validatorCreateCommerce, createCommerce)

//EDIT ONE COMMERCE
/**
 * @openapi
 * /api/commerce/{id}:
 *  put:
 *      tags:
 *      - Admin
 *      summary: Edit a commerce in the System by an id, verify rol of admin
 *      description: ''
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be patched
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, not admin, not found commerce
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authMiddlewareUser, checkRol(["admin"]), checkUniquesCommerce, validatorGetCommerce, validatorCreateCommerce, updateCommerce)

//DELETE ONE COMMERCE
/**
 * @openapi
 * /api/commerce/{id}:
 *  delete:
 *      tags:
 *      - Admin
 *      summary: Delete a commerce in the System by an id, verify rol of admin
 *      description: ''
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be patched
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, not admin, not found commerce
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authMiddlewareUser, checkRol(["admin"]), validatorGetCommerce, deleteCommerce)

module.exports = router