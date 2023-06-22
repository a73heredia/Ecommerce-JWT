import cartsModel from  '../models/carts.js';
import Carts from '../dao/cart.js';
import Products from '../dao/product.js'

class CartsController {
    //CREO EL CARRITO
    static create = async(req, res, next) => {
      const { body } = req
      console.log(body);
      try {
          const cart = await Carts.createCart(body)
          res.status(201).json(cart)
      } catch (error) {
          next(error)
      }
  }
  //LLAMO A TODOS LOS CARRITOS
    static get = async(req, res, next) => {
      try {
          const carts = await Carts.getCarts()
          res.status(200).json(carts)
      } catch (error) {
          next(error)
      }
  }
  
    //LLAMO A UN CARRITO
    static getById = async(req, res, next) => {
      const id = req.params.id
      try {
          const cart = await Carts.getCartById(id)
          res.status(200).json(cart)
      } catch (error) {
          next(error)
      }
  
  }
    //BORRO UN CARRITO
  static deleteById = async(req, res, next) => {
    try {
        await Carts.deleteCartById(req.params.id)
        res.status(200).json({message: 'Cart Deleted'})
    } catch (error) {
        next(error)
    }
}

//AGREGO AL CART

//AGREGO UN PRODUCTO EN UN CARRITO EN ESPECIFICO: PASA POR BODY SOLO EL PID Y CID
static async addProductToCart(req, res) {
  const { pid, cid } = req.body;
  const currentUser = req.user; // Obtener usuario actual

  try {
    const cart = await Carts.getCartById(cid).populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "CART NOT FOUND" });
    }

    const product = await Products.getProductById(pid); // Producto por id

    // Verificar el rol del usuario actual
    const validRoles = ["admin", "premium", "usuario"];
    if (!validRoles.includes(currentUser.role)) {
      return res.status(403).json({ message: "Invalid user role." });
    }

    // Verificar si el usuario actual es "premium" y si el producto pertenece a él
    if (
      currentUser.role === "premium" &&
      product.owner &&
      product.owner === currentUser.email
    ) {
      return res
        .status(403)
        .json({ message: "Premium users cannot add their own products to the cart."});
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
}

//Borro pto del cart

static removeProductFromCart = async(req, res, next) => {
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
  
}
   
}  
  
  export default CartsController
  