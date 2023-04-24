const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator.js")
const { webModel } = require("../models")

const validatorCreateWeb = [
    check("city").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("activity").exists().notEmpty().isLength( {min:3, max: 99} ),
    check("title").exists().notEmpty().isLength( {min:8, max: 64} ),
    check("resume").exists().notEmpty().isLength( {min:3, max: 99} ),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorGetWeb = [
    check("id").exists().notEmpty(),//.isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {validatorCreateWeb, validatorGetWeb }