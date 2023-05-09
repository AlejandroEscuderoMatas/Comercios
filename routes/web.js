const express = require("express")
const router = express.Router()
const { getWebs, getWeb, searchWeb, createWeb, updateWeb, deleteWeb, createText, uploadImage, punctuateWeb } = require("../controllers/web")
const { validatorCreateWeb, validatorGetWeb, checkUniqueWeb, checkAccessWeb } = require("../validators/web")
const { authMiddlewareCommerce, authMiddlewareUser } = require("../middleware/session")
const uploadMiddleware = require("../utils/handleStorage")

//GET ALL WEBPAGES
/**
 * @openapi
 * /api/web:
 *  get:
 *      tags:
 *      - Public User
 *      summary: Get all webs in the System
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns all the webs created
 *          '500':
 *              description: Server error
 */
router.get("/", getWebs)

//GET ONE WEBPAGE
/**
 * @openapi
 * /api/web/{id}:
 *  get:
 *      tags:
 *      - Public User
 *      summary: Get web with the id in the System
 *      description: ''
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be searched
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the web with id
 *          '403':
 *              description: Errors in parameters or not found web
 *          '500':
 *              description: Server error
 */
router.get("/:id", validatorGetWeb, getWeb)

//GET WEBPAGES BY CITY
/**
 * @openapi
 * /api/web/search/{city}:
 *  get:
 *      tags:
 *      - Public User
 *      summary: Get webs of commerces from a city in the System
 *      description: ''
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: city that need to be searched
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the webs from city
 *          '403':
 *              description: Errors in parameters
 *          '500':
 *              description: Server error
 */
router.get("/search/:city", searchWeb)

//GET WEBPAGES BY CITY AND ACTIVITY
/**
 * @openapi
 * /api/web/search/{city}/{activity}:
 *  get:
 *      tags:
 *      - Public User
 *      summary: Get webs of commerces from a city with an activity in the System
 *      description: ''
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: city that need to be searched
 *              required: true
 *              schema:
 *                  type: string
 *          -   name: activity
 *              in: path
 *              description: activity that need to be searched
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the webs from city and activity
 *          '403':
 *              description: Errors in parameters
 *          '500':
 *              description: Server error
 */
router.get("/search/:city/:activity", searchWeb)

//CREATE WEBPAGE
/**
 * @openapi
 * /api/web:
 *  post:
 *      tags:
 *      - Commerce
 *      summary: Creates a new Web for a commerce, requires jwt from commerce, and a commerce can have just one web
 *      description: ''
 *      responses:
 *          '200':
 *              description: Returns the web created
 *          '403':
 *              description: Errors in parameters, jwt not found, web already created, web logically deleted so no post available
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", authMiddlewareCommerce, checkUniqueWeb,  validatorCreateWeb, createWeb)

//UPDATE WEBPAGE
/**
 * @openapi
 * /api/web/{id}:
 *  put:
 *      tags:
 *      - Commerce
 *      summary: Updates the Web from a commerce, requires jwt from commerce, and a commerce can edit just its web
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
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, web not created, web logically deleted so no put available, id from web not equal to jwt id
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authMiddlewareCommerce, checkAccessWeb, validatorGetWeb, validatorCreateWeb, updateWeb)

//DELETE WEBPAGE
/**
 * @openapi
 * /api/web/{id}:
 *  delete:
 *      tags:
 *      - Commerce
 *      summary: Deletes the Web from a commerce, requires jwt from commerce, and a commerce can delete just its web
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
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, web not created, web logically deleted so not web found to delete, id from web not equal to jwt id
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", authMiddlewareCommerce, checkAccessWeb, validatorGetWeb, deleteWeb)

//UPLOAD TEXT TO WEBPAGE
/**
 * @openapi
 * /api/web/texts/{id}:
 *  post:
 *      tags:
 *      - Commerce
 *      summary: Uploads a text to the webpage of a commerce, requires jwt from commerce, and a commerce can upload text just for its web
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
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, web not found, web logically deleted so not web found to delete, id from web not equal to jwt id
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/texts/:id", authMiddlewareCommerce, checkAccessWeb, createText)

//DELETE WEBPAGE
/**
 * @openapi
 * /api/web/photos/{id}:
 *  post:
 *      tags:
 *      - Commerce
 *      summary: Uploads an image to the webpage of a commerce, requires jwt from commerce, and a commerce can upload images just for its web
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
 *              description: Returns the web edited
 *          '403':
 *              description: Errors in parameters, jwt not found, web not found, web logically deleted so not web found to delete, id from web not equal to jwt id
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/photos/:id", authMiddlewareCommerce, checkAccessWeb, uploadMiddleware.single("image"), uploadImage)

//DELETE WEBPAGE
/**
 * @openapi
 * /api/web/{id}:
 *  patch:
 *      tags:
 *      - Registered User
 *      summary: Punctuate a webpage, requires jwt from user, and a commerce can upload text just for its web
 *      description: 'Pendant of work allow just one score for one client, maybe implementing it with a dictionary IdUser : ScoreUser'
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
 *              description: Errors in parameters, jwt not found, web not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/:id", authMiddlewareUser, validatorGetWeb, punctuateWeb)

module.exports = router