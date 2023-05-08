import { Router } from 'express';
import sessionsRouterApi from './api/sessions.js';
import sessionsRouterViews from './views/sessions.js';

const router = Router();

router.use('/api/sessions', sessionsRouterApi);
router.use('/', sessionsRouterViews);

export default router;