const { matchedData } = require('express-validator')
const { commerceModel } = require('../models')
const { handleHttpError } = require('../utils/handleErrors')
const { tokenSignCommerce } = require("../utils/handleJwt")

const getCommerces = async (req, res) => {
    const data = await commerceModel.find({})
    res.send(data)
}

/* Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getCommerce = async (req, res) => {
    try{
        const {id} = matchedData(req) //Me quedo solo con el id
        const data = await commerceModel.findById(id)
        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_COMMERCE")
    }
}

const createCommerce = async (req, res) => {
    const { body } = req
    
    const commerce = await commerceModel.create(body)

    const data = {
        token: await tokenSignCommerce(commerce),
        commerce
    }

    res.send(data)
}

const updateCommerce = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        
        const data = await commerceModel.findByIdAndUpdate(id, body)
        res.send(data)
    }
    catch(err)
    {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_COMMERCE")
    }
}

const deleteCommerce = async (req, res) => {
    try{
        const { id } = matchedData(req)
        const data = await commerceModel.delete({_id:id})
        res.send(data)
    }
    catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_COMMERCE', 403)
    }
}

module.exports = { getCommerces, getCommerce, createCommerce, updateCommerce, deleteCommerce };