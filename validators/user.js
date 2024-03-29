const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator.js")
const { handleHttpError } = require("../utils/handleErrors")
const { userModel } = require("../models/index.js")

const validatorCreateUser = [
    check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength( {min:8, max: 64} ),
    check("age").exists().notEmpty().isNumeric(),
    check("city").exists().notEmpty(),
    check("interests").exists().notEmpty(),
    check("accept").exists().notEmpty().isBoolean(),
    //Middleware tiene que responder después de la petición
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetUser = [
    check("id").exists().notEmpty(),//.isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const checkUniquesUser = async (req, res, next) => {
    
    const user = await userModel.findOne({ email: req.body.email })

    if(user != null)
    {
        handleHttpError(res, "EMAIL_ALREADY_IN_USE")
        return
    }
    
    next()
}

module.exports = {validatorCreateUser, validatorGetUser, checkUniquesUser}