import { Router } from 'express';

import routerApiProducts from './api/indexProducts.js';
import routerViewsRoutes from './views/indexProducts.js';

const router = Router();

router.use('/api/products', routerApiProducts);
router.use('/products', routerViewsRoutes);


export default router;