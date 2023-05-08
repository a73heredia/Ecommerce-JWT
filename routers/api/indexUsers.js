import { Router } from 'express'

import UsersController from '../../controllers/users.js'
import Utils from '../../utils/index.js'

const router = Router()

router
  .get('/',Utils.authJWTMiddleware(['admin']),  UsersController.get)
  .post('/', Utils.authJWTMiddleware(['admin']),  UsersController.create)
  .get('/:id', Utils.authJWTMiddleware(['admin', 'usuario']), UsersController.getById)
  .put('/:id', Utils.authJWTMiddleware(['admin', 'usuario']), UsersController.updateById)
  .delete('/:id', Utils.authJWTMiddleware(['admin']), UsersController.deleteById)

export default router