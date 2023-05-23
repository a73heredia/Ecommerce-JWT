import { Router } from 'express'
import MessagesController from '../../controllers/messages.js'

const router = Router()

router  
    .get('/', MessagesController.get)
    .post('/', MessagesController.create)
    .get('/:id', MessagesController.getById)
    .put('/:id', MessagesController.updateById)
    .delete('/:id', MessagesController.deleteById)

    export default router