import UserModel from '../models/user.js'
import Utils from '../utils/index.js'
import Users from '../dao/user.js'
import user from '../models/user.js'

class UserController {

  static create = async(req, res, next) => {
    const {  body } = req
    const data = {
      ...body,
      password: Utils.createHash(body.password)
    }
    try {
      const user = await Users.createUser(user)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  // static create = async (body) => {
  //   const user = await Users.createUser(body)
  //   return { status: 'success', payload: user }
  // }

  // static async get(req, res) {
  //   const result = await UserModel.find()
  //   res.status(200).json(result)
  // }

  static get = async(req, res, next) => {
    try {
      const users = await Users.getUsers()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }  
  }


  // static async getById(req, res) {
  //   const { params: { id } } = req
  //   const result = await UserModel.findById(id)
  //   if (!result) {
  //     return res.status(404).end()
  //   }
  //   res.status(200).json(result)
  // }

  static getById =  async(req, res, next) => {
    try {
      const user = await Users.getUserById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  // static async updateById(req, res) {
  //   const { params: { id }, body } = req
  //   await UserModel.updateOne({ _id: id }, { $set: body })
  //   res.status(204).end()
  // }

  static updateById = async(req, res, next) => {
    const id = req.params.id
    const data = req.body
    try {
      await Users.updateUserById(id, data)
      res.status(200).json({message: 'Updated'})
    } catch (error) {
      next(error)
    }
  }

  // static async deleteById(req, res) {
  //   const { params: { id } } = req
  //   await UserModel.deleteOne({ _id: id })
  //   res.status(204).end()
  //}

  static deleteById = async(req, res, next) => {
    const id = req.params.id
    try {
      await Users.deleteUser(id)
      res.status(200).json({message: 'Deleted'})
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res){
    const {body: {email, password}} = req
    const user = await UserModel.findOne({email})

    if(!user){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }

    if(!Utils.validatePassword(password, user)){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }

    const token = Utils.tokenGenerator(user)
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    }).status(200).json({success: true})
  } 

}

export default UserController