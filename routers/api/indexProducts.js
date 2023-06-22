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
     .put('/:id',Utils.authJWTMiddleware(['admin','premium']), ProductController.updateById)
     .delete('/:id',Utils.authJWTMiddleware(['admin','premium']), ProductController.deleteById)

// router.post('/', async(req, res, next) => {
//     const { body } = req
//     console.log(body);
//     try {
//         const product = await ProductController.create(body)
//         res.status(201).json(product)
//     } catch (error) {
//         next(error)
//     }
// })

// router.get('/', async(req, res, next) => { 
//     try {
//         const result = await ProductController.get()
//         const { query: {limit = 5, page = 1 } } = req
//         const options = {
//             limit,
//             page
//         }
//         const products = await ProductModel.paginate({}, options)
//         //res.json(CommonsUtils.buildResponse(products))
//         res.json(result)
//     } catch (error) {
//         next(error)
//     }
// })

// router.get('/:id', async(req, res, next) => {
//     try {
//         const product = await ProductController.getById(req.params.id)
//         res.status(200).json(product)
//     } catch (error) {
//         next(error)
//     }
// })

// router.put('/:id', async(req, res, next) => {
//     const id = req.params.id
//     const data = req.body
//     try {
//         await ProductController.updateById(id, data)
//         res.status(200).json({message: 'Updated'})
//     } catch (error) {
//         next(error)
//     }
// })

// router.delete('/:id', async(req, res, next) => {
//     const id = req.params.id
//     try {
//         await ProductController.deleteById(id)
//         res.status(200).json({message: 'Deleted'})
//     } catch (error) {
//         next(error)
//     }
// })

export default router;