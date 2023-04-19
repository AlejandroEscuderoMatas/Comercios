const { matchedData } = require('express-validator')
const { userModel } = require('../models')
const { handleHttpError } = require('../utils/handleErrors')

const getUsers = async (req, res) => {
    const data = await userModel.find({})
    res.send(data)
}

/* Obtener un detalle
 * @param {} req 
 * @param {*} res 
 */
const getUser = async (req, res) => {
    try{
        const {id} = matchedData(req) //Me quedo solo con el id
        const data = await userModel.findById(id)
        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_USER")
    }
}

const createUser = async (req, res) => {
    const { body } = req
    const data = await userModel.create(body)
    res.send(data)
}

const updateUser = async (req, res) => {
    try{
        const {id, ...body} = matchedData(req) //Extrae el id y el resto lo asigna a la constante body
        
        const data = await userModel.findByIdAndUpdate(id, body)
        res.send(data)
    }
    catch(err)
    {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_USER")
    }
}

const deleteUser = async (req, res) => {
    try{
        const { id } = matchedData(req)
        const data = await userModel.delete({_id:id})
        res.send(data)
    }
    catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_USER', 403)
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };