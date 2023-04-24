const { handleHttpError } = require("../utils/handleErrors")
const { verifyToken }     = require("../utils/handleJwt")
const { userModel, commerceModel, webModel }      = require("../models")

const authMiddlewareUser = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop() 
        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)

        if(!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        const user = await userModel.findById(dataToken._id)
        req.user = user // Inyecto al user en la petición

        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_USER_SESSION", 401)
    }
}

const authMiddlewareCommerce = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        // Nos llega la palabra reservada Bearer (es un estándar) y el Token, así que me quedo con la última parte
        const token = req.headers.authorization.split(' ').pop() 
        //Del token, miramos en Payload (revisar verifyToken de utils/handleJwt)
        const dataToken = await verifyToken(token)

        if(!dataToken) {
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        const commerce = await commerceModel.findById(dataToken._id)

        const web = await webModel.findById(dataToken._id)

        //Comprobamos que la el comercio no tenga ya una web creada
        if(web != null) {
            handleHttpError(res, "WEB_ALREADY_EXISTS", 401)
            return
        }

        req.commerceId = commerce._id // Inyecto al comercio en la petición

        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_COMMERCE_SESSION", 401)
    }
}

module.exports = { authMiddlewareUser, authMiddlewareCommerce }