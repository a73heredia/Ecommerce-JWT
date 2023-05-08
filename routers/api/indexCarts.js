import { Router } from 'express';
import CartsController from '../../controllers/carts.js';
import Utils from '../../utils/index.js'

const routerCarts = Router();

routerCarts
    .post('/',Utils.authJWTMiddleware(['usuario', 'admin']), CartsController.createCarts)
    .get('/',Utils.authJWTMiddleware(['usuario', 'admin']), CartsController.getCarts)
    .get('/:cid',Utils.authJWTMiddleware(['usuario']), CartsController.getCartById)
    .post('/:cid',Utils.authJWTMiddleware(['admin']), CartsController.addProductToCart)
    .put('/:cid',Utils.authJWTMiddleware(['admin']), CartsController.removeProductFromCart)
    .delete('/:cid',Utils.authJWTMiddleware(['admin']), CartsController.deleteCart)



export default routerCarts;