const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator.js")
const { handleHttpError } = require("../utils/handleErrors")
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

const checkUniqueWeb = async (req, res, next) => {
    
    const web = await webModel.findById(req.commerceId)

    //Comprobamos que la el comercio no tenga ya una web creada
    if(web != null) {
        handleHttpError(res, "WEB_ALREADY_EXISTS", 401)
        return
    }

    /*console.log(web)

    if(web.deleted == true)
    {
        web.deleted == false
    }*/
    
    next()
}

const checkAccessWeb = async (req, res, next) => {
    //Comprobamos que la el comercio no tenga ya una web creada
    if(req.commerceId != req.params.id) {
        handleHttpError(res, "NOT_YOUR_WEB", 401)
        return
    }
    
    next()
}

module.exports = {validatorCreateWeb, validatorGetWeb, checkUniqueWeb, checkAccessWeb }