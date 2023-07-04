import { Router } from 'express'
import Utils from '../../utils/index.js'
import UsersController from '../../controllers/users.js'

const router = Router()

router
  .post('/login', UsersController.login)
  .post('/register', UsersController.create)
  .post('/logout', UsersController.logout)
  .get('/email', UsersController.email)
  

export default router
