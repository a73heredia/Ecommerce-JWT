import { Router } from 'express'

import usersRouter from './indexUsers.js'
import cartsRouter from './indexCarts.js'
import productsRouter from './indexProducts.js'
import authRouter from './auth.js'
import messagesRouter from './indexMessages.js'
import githubRouter from './github.js'
import Utils from '../../utils/index.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/carts', cartsRouter)
router.use('/products', productsRouter)
router.use('/messages', messagesRouter)
router.use('/', githubRouter)

router.use('/current', Utils.authJWTMiddleware('usuario'),Utils.authorizationMiddleware('usuario'), (req, res) => {
    res.json({success: true, message: 'This is a private route', user: req.user})
})

export default router