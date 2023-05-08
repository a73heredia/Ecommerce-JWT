import { Router } from 'express'

import usersRouter from './indexUsers.js'
import cartsRouter from './indexCarts.js'
import productsRouter from './indexProducts.js'
import authRouter from './auth.js'
import Utils from '../../utils/index.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/carts', cartsRouter)
router.use('/products', productsRouter)
router.use('/current', Utils.authJWTMiddleware('admin'),Utils.authorizationMiddleware('admin'), (req, res) => {
    res.json({success: true, message: 'This is a private route', user: req.user})
})

export default router