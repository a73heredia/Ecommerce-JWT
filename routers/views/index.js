import { Router } from "express";

import routerVistaCartID from "./indexCarts.js";
import routerVistaProducto from "./indexProducts.js";
import routerVistaMensajes from './indexMessages.js'
import routerGithub from './github.js'

const router = Router()

router.use('/carrito', routerVistaCartID)
router.use('/productos', routerVistaProducto)
router.use('/mensajes', routerVistaMensajes)
router.use('/', routerGithub)

export default router