import { Router } from 'express'

import UsersController from '../../controllers/users.js'
import Users from '../../dao/user.js'
import Utils from '../../utils/index.js'
import user from '../../models/user.js'

 const router = Router()
 
 router
 .post('/', /* Utils.authJWTMiddleware(['admin']) */  UsersController.create)
 .post('/reset', UsersController.resetPassword)
 .get('/',  UsersController.get)
 .get('/data', Utils.authJWTMiddleware(['admin']), UsersController.getData)
 .get('/:id', /* Utils.authJWTMiddleware(['admin', 'usuario']), */ UsersController.getById)
 .get('/premium/:id' ,Utils.authJWTMiddleware(['admin']), UsersController.changeUserRole)
 .put('/:id' , Utils.authJWTMiddleware(['admin', 'usuario']) , UsersController.updateById)
 .delete('/:id', UsersController.deleteById)
 .post('/:id/documents',Utils.authJWTMiddleware(['admin','user','premium']), UsersController.uploadImage)
 .delete('/',Utils.authJWTMiddleware(['admin']), UsersController.deleteInactiveUsers)
 


// router.get('/', async(req, res, next) => {
//   try {
//     const users = await UsersController.get()
//     res.status(200).json(users)
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/', async(req, res, next) => {
//   const {  body } = req
//   const data = {
//     ...body,
//     password: Utils.createHash(body.password)
//   }
//   try {
//     const user = await UsersController.create(data)
//     res.status(201).json(user)
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/:id', async(req, res, next) => {
//   try {
//     const user = await UsersController.getById(req.params.id)
//     res.status(200).json(user)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:id', async(req, res, next) => {
//   const id = req.params.id
//   const data = req.body
//   try {
//     await UsersController.updateById(id, data)
//     res.status(200).json({message: 'Updated'})
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:id', async(req, res, next) => {
//   const id = req.params.id
//   try {
//     await UsersController.deleteById(id)
//     res.status(200).json({message: 'Deleted'})
//   } catch (error) {
//     next(error)
//   }
// })

export default router