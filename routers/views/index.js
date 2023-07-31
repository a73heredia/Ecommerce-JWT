import { Router } from "express";

import routerVistaCartID from "./indexCarts.js";
import routerVistaProducto from "./indexProducts.js";
import routerVistaMensajes from './indexMessages.js'
import  routerReset from './reset.js'
import routerGithub from './github.js'
import routerViewUsers from "./indexUsers.js";

const router = Router()

router.use('/carrito', routerVistaCartID)
router.use('/products', routerVistaProducto)
router.use('/mensajes', routerVistaMensajes)
router.use('/reset', routerReset)
router.use('/users', routerViewUsers)
router.use('/', routerGithub)

export default router