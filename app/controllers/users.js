const {httpError} = require('../helpers/handleError')
const userModel = require('../models/users')
const mongoose = require('mongoose')

const getItems = async (req, res) => {
    try {
        const listAll = await userModel.find()
        res.status(200).json({data: listAll})
    } catch (error) {
        httpError(res, error)
    }
}

const getItem = async (req, res) => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'ID no válido' })
        }

        const user = await userModel.findOne({_id: id})        
        if (user) {
            res.json({data: user})
        } else {
            res.json({data: 'Usuario no encontrado'})
        }               
    } catch (error) {
        httpError(res, error)
    }
}

const createItem = async (req, res) => {
    try {
        const {name, age, email} = req.body
        const resDetail = await userModel.create({name, age, email})
        res.json({ data: resDetail })
    } catch (error) {
        httpError(res, error)
    }
}

const updateItem = async (req, res) => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({ error: 'ID no válido' })
        }

        const user = await userModel.findOne({_id: id})        
        if (user) {            
            try {
                const {name, age, email} = req.body
                const nuevosDatos = {
                    name: name,
                    age: age,
                    email: email
                }                
                const { modifiedCount } = await userModel.updateOne({ _id: id }, nuevosDatos);
                if(modifiedCount > 0) {
                    res.json({data: 'Usuario modificado correctamente'})
                }                
            } catch (error) {
                httpError(res, error)
            }            
        } else {
            res.status(404).json({data: 'Usuario no econtrado'})
        }
    } catch (error) {
        httpError(res, error)
    }
}

const deleteItem = async (req, res) => {
    try {
        const id = req.params.id
        if(!isValidObjectId(id)) {
            return res.status(400).json({data: 'Id no es válido'})
        }
        const user = await userModel.findById(id)
        if (user) {
            try {
                const {deletedCount} = await userModel.deleteOne({_id: id})                
                if (deletedCount > 0) {
                    return res.json({data: 'Usuario eliminado correctamente'})
                } else {
                    return res.status(400).json({data: 'Error al eliminar el Usuario'})
                }
            } catch (error) {
                httpError(res, error)
            }
        } else {
            return res.status(404).json({data: 'Usuario no econtrado'})
        }
    } catch (error) {
        httpError(res, error)
    }
}

const isValidObjectId = (id) => {
    if (typeof id !== 'string') {
      return false;
    }
  
    return /^[0-9a-fA-F]{24}$/.test(id);
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}