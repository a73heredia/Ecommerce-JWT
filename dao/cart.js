import CartModel from '../models/carts.js'

class Carts {
    static createCart(cart) {
        return CartModel.create(cart)
    }

    static getCarts() {
        return CartModel.find().populate('products')
    }

    static getCartById(id) {
        return CartModel.findById(id).populate('products')
    }

    static updateCartById(id, data) {
        return CartModel.updateOne({_id: id}, {$set: data})
    }
    static deleteCartById(id) {
        return CartModel.deleteOne({_id: id})
    }
}

export default Carts