import { Router  } from "express";
import ProductController from "../../controllers/products.js";


const routerProducts = Router();

routerProducts
    .get('/', ProductController.get)
    .get('/:id', ProductController.getById)
    .post('/', ProductController.create)
    .put('/:id', ProductController.updateById)
    .delete('/:id', ProductController.deleteById)

export default routerProducts;