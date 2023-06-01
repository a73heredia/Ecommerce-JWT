import { Router } from 'express';
import CartsController from '../../controllers/carts.js';
import Carts from '../../dao/cart.js';
import Utils from '../../utils/index.js'

const router = Router();

 router
     .post('/', CartsController.create)
     .get('/', CartsController.get)
     .get('/:id', CartsController.getById)
     .post('/:id', CartsController.addProductToCart)
     .put('/:id', CartsController.removeProductFromCart)
     .delete('/:id', CartsController.deleteById)



export default router;