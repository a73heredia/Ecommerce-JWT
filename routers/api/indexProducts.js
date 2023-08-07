import { Router  } from "express";
import ProductController from "../../controllers/products.js";
import CommonsUtils from "../../utils/common.js";
import ProductModel from '../../models/product.js'
import Utils from '../../utils/index.js'

const router = Router();

router
     .get('/', ProductController.get)
     .get('/:id', ProductController.getById)
     .post('/',Utils.authJWTMiddleware(['admin','premium']), ProductController.create)
     .put('/:id' ,Utils.authJWTMiddleware(['admin','premium']) , ProductController.updateById)
     .delete('/:id',Utils.authJWTMiddleware(['admin','premium']), ProductController.deleteById)


export default router;