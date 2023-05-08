import { Router } from 'express';
import ProductModel from '../../models/product.js';
import CommonsUtils from '../../utils/common.js';

const router = Router();


router.get('/', async (req, res) => {
    const { query: {limit = 10, page = 1} } = req
    const options = {
        limit,
        page
      }
  const result = await ProductModel.paginate({}, options);
   res.render('products', CommonsUtils.buildResponse(result))

})

export default router