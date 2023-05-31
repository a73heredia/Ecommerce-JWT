import { Router } from 'express'
import Utils from '../../utils/index.js'
import UsersController from '../../controllers/users.js'

const router = Router()

router
  .post('/login', UsersController.login)
  .post('/register', async(req, res, next) => {
    const {  body } = req
    const data = {
      ...body,
      password: Utils.createHash(body.password)
    }
    try {
      const user = await UsersController.create(data)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  })

export default router