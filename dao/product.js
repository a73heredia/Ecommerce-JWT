import ProductModel from '../models/product.js'

class Products {
    static createProduct(product) {
        return ProductModel.create(product)
    }

    static getProducts() {
        return ProductModel.find()
    }

    static getProductById(id) {
        return ProductModel.findById(id)
    }

    static updateProductById(id, data) {
        return ProductModel.updateOne({_id: id}, {$set: data})
    }

    static deleteProductById(id) {
        return ProductModel.deleteOne({_id: id})
    }
}

export default Products