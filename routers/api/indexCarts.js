import { Router } from 'express';
import CartsController from '../../controllers/carts.js';
import Carts from '../../dao/cart.js';
import Utils from '../../utils/index.js'

const router = Router();

// routerCarts
//     .post('/',Utils.authJWTMiddleware(['usuario']), CartsController.createCarts)
//     .get('/',Utils.authJWTMiddleware(['usuario']), CartsController.getCarts)
//     .get('/:cid',Utils.authJWTMiddleware(['usuario']), CartsController.getCartById)
//     .post('/:cid',Utils.authJWTMiddleware(['admin']), CartsController.addProductToCart)
//     .put('/:cid',Utils.authJWTMiddleware(['admin']), CartsController.removeProductFromCart)
//     .delete('/:cid',Utils.authJWTMiddleware(['admin']), CartsController.deleteCart)

router.post('/', async(req, res, next) => {
    const { body } = req
    try {
        const cart = await CartsController.create(body)
        res.status(201).json(cart)
    } catch (error) {
        next(error)
    }
})

router.post('/:id', async(req, res, next) => {
    const { pid } = req.body;
      const _id = req.params.id;
  
      try {
        const cart = await Carts.getCartById(_id)
        console.log(cart);
        if (!cart) {
          return res.status(404).json({ message: "CART NOT FOUND" });
        }
        const productIndex = cart.products.findIndex(
          (p) => p.product._id.toString() === pid
        );
        if (productIndex >= 0) {
          cart.products[productIndex].quantity += 1;
        } else {
          cart.products.push({ product: pid });
        }
        await cart.save();
        return res.status(200).json(cart);
      }
      catch (error) {
        next(error)
      }
})

router.get('/', async(req, res, next) => {
    try {
        const carts = await CartsController.get()
        res.status(200).json(carts)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const cart = await CartsController.getById(req.params.id)
        res.status(200).json(cart)
    } catch (error) {
        next(error)
    }

})

router.put('/:id', async(req, res, next) => {
    const { pid } = req.body;
    const _id = req.params.id;

    try {
        const cart = await Carts.getCartById(_id)
        if (!cart) {
          return res.status(404).json({ message: "CART NOT FOUND" });
        }
        const productIndex = cart.products.findIndex(
          (p) => p.product._id.toString() === pid
        );
        if (productIndex >= 0) {
          cart.products[productIndex].quantity -= 1;
          if (cart.products[productIndex].quantity === 0) {
            cart.products.splice(productIndex, 1);
          }
          await cart.save();
          return res.status(200).json(cart);
        } else {
          return res.status(404).json({ message: "PRODUCT NOT FOUND" });
        }
    } catch (error) {
        next(error)
    }
    
})

router.delete('/:id', async(req, res, next) => {
    try {
        await CartsController.deleteById(req.params.id)
        res.status(200).json({message: 'Cart Deleted'})
    } catch (error) {
        next(error)
    }
})


export default router;