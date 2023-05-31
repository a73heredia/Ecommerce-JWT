import UserModel from '../models/user.js'
import Utils from '../utils/index.js'
import Users from '../dao/user.js'

class UserController {

  // static async create(req, res) {
  //   const { body } = req
  //   const user = {
  //     ...body,
  //     password: Utils.createHash(body.password)
  //         }
  //   const result = await UserModel.create(user)
  //   res.status(201).json(result)
  // }

  static create = async (body) => {
    const user = await Users.createUser(body)
    return { status: 'success', payload: user }
  }

  // static async get(req, res) {
  //   const result = await UserModel.find()
  //   res.status(200).json(result)
  // }

  static get = async() => {
    const users = await Users.getUsers()
    return { status: 'success', payload: users }
  }

  // static async getById(req, res) {
  //   const { params: { id } } = req
  //   const result = await UserModel.findById(id)
  //   if (!result) {
  //     return res.status(404).end()
  //   }
  //   res.status(200).json(result)
  // }

  static getById = async(id) => {
    const user = await Users.getUserById(id)
    return { status: 'success', payload: user }
  }

  // static async updateById(req, res) {
  //   const { params: { id }, body } = req
  //   await UserModel.updateOne({ _id: id }, { $set: body })
  //   res.status(204).end()
  // }

  static updateById = async(id, body) => {
    const data = body
    await Users.updateUserById(id, data)

    return { status: 'success' }
  }

  // static async deleteById(req, res) {
  //   const { params: { id } } = req
  //   await UserModel.deleteOne({ _id: id })
  //   res.status(204).end()
  //}

  static deleteById = async(id) => {
    await Users.deleteUser(id)
    return {status: 'success'}
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