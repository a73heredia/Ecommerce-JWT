import { Router } from 'express';
import CartsController from '../../controllers/carts.js';
import Carts from '../../dao/cart.js';
import Utils from '../../utils/index.js'

const router = Router();

 router
     .post('/',Utils.authJWTMiddleware(['admin']) ,CartsController.create)
     .get('/', CartsController.get)
     .get('/:id',Utils.authJWTMiddleware(['admin', 'usuario', 'premium']), CartsController.getById)
     .post('/:id',Utils.authJWTMiddleware(['admin','premium', 'usuario']), CartsController.addProductToCart)
     .put('/:id',Utils.authJWTMiddleware(['admin']), CartsController.removeProductFromCart)
     .delete('/:id',Utils.authJWTMiddleware(['admin']), CartsController.deleteById)
     



export default router;