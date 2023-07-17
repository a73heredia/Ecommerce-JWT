import UserModel from '../models/user.js'
import Utils from '../utils/index.js'
import Users from '../dao/user.js'
import Carts from '../dao/cart.js'
import user from '../models/user.js'
import emailService from '../services/email.service.js'
import { uploader } from '../utils.js'
import multer from 'multer'

class UserController {

  static async create(req, res) {
    const { body } = req;
    const cart = await Carts.createCart({ items: [] }); // creo carrito vacío con el registro de usuario
    const user = {
      ...body,
      password: Utils.createHash(body.password),
      cart: cart._id, 
      status: 'inactive',
    };
    const result = await Users.createUser(user);
    res.status(201).json(result);
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

  static getByEmail =  async(req, res, next) => {
    try {
      const user = await Users.getUserByEmail(req.body.email)
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
    // const user = await UserModel.findOne({email})
    const user = await Users.getUserByEmail(email)
    if(!user){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }

    if(!Utils.validatePassword(password, user)){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }

    user.status = 'active';
    await user.save();

    const token = Utils.tokenGenerator(user)
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    }).status(200).json({success: true, token: token})
  } 

  static async logout(req, res) {
    const {body: {email}} = req
    const user = await Users.getUserByEmail(email)
    user.status = 'inactive'; // si deslogueo el usuario pasa a estar inactivo
    await user.save();
    res.clearCookie('token');
    res.status(200).json({success: true, message: 'fuera de linea'});
}


  static async email(req, res) {
    const attachments = []
    const result = await emailService.sendEmail(
      'aleheredia@outlook.com',
      'hola como estas?',
      `
      <div>
      <h1>Hola Ale como estas?</h1>
      <a href="http://localhost:8080/reset.html">Cambiar contraseña</a>
      </div>
      `,
      attachments
    )
    console.log(result);
    res.send(
      `
      <div>
        <h1>Hello Email</h1>
          <a href="/">Go Back</a>
        </div>
    `)
  }

  static resetPassword = async(req, res, next) => {
    const {body: {email, password}} = req
    let user = await Users.getUserByEmail(email)
    if(!user){
      return res.status(401).json({ massage: ' Usuario o Contraseña Incorrecto'})
    }
    let id = user.id 
    
    try {
      let pswd = Utils.createHash(password)
      await Users.updatePassword(id, pswd)
      res.status(200).json({message: 'Updated'})
      res.send(pswd)
    } catch (error) {
      next(error)
    }
 
  }

  static async changeUserRole(req, res) {
    const { params: { id } } = req;
    const user = await Users.getUserById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  
    let newRole = '';
    if (user.role === 'usuario') {
      newRole = 'premium';
    } else if (user.role === 'premium') {
      newRole = 'usuario';
    } else {
      return res.status(400).json({ message: 'Rol de usuario inválido' });
    }
  
    user.role = newRole;
    await user.save();
  
    res.status(200).json({ message: 'Rol de usuario actualizado exitosamente', newRole });
  }

  static async uploadImage(req, res) {
    try {
      const { params: { id }} = req;

      //Verificar si el usuario existe
      const user = await Users.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      //Configuarcion de Multer para guardar en diferentes carpetas
      const upload = multer({storage: uploader.storage}).fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'productImage', maxCount: 1 },
        { name: 'document', maxCount: 1 }
      ]);

      upload(req, res, async(err) => {
        if(err) {
          return res.status(400).json({ message: 'Error al subir el archivo' });
        }

         // Obtener los archivos subidos
         const profileImage = req.files['profileImage'] ? req.files['profileImage'][0] : null;
         const productImage = req.files['productImage'] ? req.files['productImage'][0] : null;
         const document = req.files['document'] ? req.files['document'][0] : null;

         res.status(200).json({ message: 'Archivo subido exitosamente' });
      })

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

}

export default UserController