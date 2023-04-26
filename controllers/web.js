const { matchedData } = require('express-validator')
const { webModel } = require('../models')
const { handleHttpError } = require('../utils/handleErrors')

const getWebs = async (req, res) => {
    const data = await webModel.find({})
    res.send(data)
}

/* Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getWeb = async (req, res) => {
    try{
        const {id} = matchedData(req) //Me quedo solo con el id
        const data = await webModel.findById(id)
        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_WEB")
    }
}

const searchWeb = async (req, res) => {
    try{
        const _city = req.params.city //Me quedo solo con la ciudad
        const _activity = req.params.activity

        if(_activity === undefined){
            const data = await webModel.find({city: _city})
            res.send(data)
        }
        else{
            const data = await webModel.find({city: _city, activity: _activity})
            res.send(data)
        }
        
        
    } catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_SEARCH_WEB")
    }
}

const createWeb = async (req, res) => {
    const { body } = req
    body._id = req.commerceId
    const data = await webModel.create(body)
    res.send(data)
}

const updateWeb = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        
        const data = await webModel.findByIdAndUpdate(id, body)
        res.send(data)
    }
    catch(err)
    {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_WEB")
    }
}

const deleteWeb = async (req, res) => {
    try{
        const { id } = matchedData(req)
        const data = await webModel.delete({_id:id})
        res.send(data)
    }
    catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_WEB', 403)
    }
}

const createText = async (req, res) => {

    const web = await webModel.findByIdAndUpdate(req.commerceId, { $push: { texts: req.body.texts } }, { new: true })

    res.send(web)
}

const uploadImage = async (req, res) => {
    const { body, file } = req
    const fileData = { 
        filename: file.filename,
        url: process.env.PUBLIC_URL+"/"+file.filename
    }
    const data = await webModel.findByIdAndUpdate(req.commerceId, { $push: { images: fileData.url } }, { new: true })
    res.send(data)
}

module.exports = { getWebs, getWeb, searchWeb, createWeb, updateWeb, deleteWeb, createText, uploadImage };