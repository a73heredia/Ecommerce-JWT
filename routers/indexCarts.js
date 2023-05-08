import { Router } from 'express';

import routerApiCarts from './api/indexCarts.js';
import routerViewsCarts from './views/indexCarts.js'

const routerCarts = Router();

routerCarts.use('/api/carts', routerApiCarts);
routerCarts.use('/carts', routerViewsCarts);

export default routerCarts;