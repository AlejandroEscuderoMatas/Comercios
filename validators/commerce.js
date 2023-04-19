const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator.js")

const validatorCreateCommerce = [
    check("name").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("CIF").exists().notEmpty().isAlphanumeric(),
    check("email").exists().notEmpty().isLength( {min:8, max: 64} ).isEmail(),
    check("direction").exists().notEmpty().isLength( {min:8, max: 99} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetCommerce = [
    check("id").exists().notEmpty(),//.isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorCreateCommerce, validatorGetCommerce}