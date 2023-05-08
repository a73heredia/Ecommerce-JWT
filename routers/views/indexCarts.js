import { Router } from 'express';
import CartModel from '../../models/carts.js';
import CommonsUtils from '../../utils/common.js';

const routerViewsCart = Router()


//la ruta para llamar a un carrito con sus productos sería localhost:8080/carrito/:cid
routerViewsCart.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await CartModel.findById(id).populate('products.product').lean();
    
    if (!cart) {
      throw new Error(`CART ${id} NOT FOUND`);
    }
    
    res.render('carts',  cart );
    //console.log(JSON.stringify(cart, null, 2));

  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default routerViewsCart;
