import cartsModel from  '../models/carts.js';
import Carts from '../dao/cart.js';

class CartsController {
    //CREO EL CARRITO
    static create = async(body) => {
      const cart = await Carts.createCart(body)
      return cart
    }
  //LLAMO A TODOS LOS CARRITOS
    static get = async() => {
      const carts = await Carts.getCarts()
      return carts
    }
  
    //LLAMO A UN CARRITO
    static getById = async(id) => {
      const cart = await Carts.getCartById(id)
      return cart
    }  
    //BORRO UN CARRITO
  static deleteById = async(id) => {
    await Carts.deleteCartById(id)
    return { status: 'Cart Deleted'}  
  }
  
  }  
  
  export default CartsController
  