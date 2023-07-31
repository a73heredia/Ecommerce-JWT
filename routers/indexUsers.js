import { Router } from 'express';
import Utils from '../utils/index.js';
import routerViewUsers from './views/indexUsers.js';

const router = Router();


router.use('/users',Utils.authJWTMiddleware(['admin']), routerViewUsers);


export default router;