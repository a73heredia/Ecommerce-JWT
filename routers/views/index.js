import { Router } from "express";

import routerVistaCartID from "./indexCarts.js";
import routerVistaProducto from "./indexProducts.js";
import routerVistaMensajes from './indexMessages.js'

const router = Router()

router.use('/carrito', routerVistaCartID)
router.use('/productos', routerVistaProducto)
router.use('/mensajes', routerVistaMensajes)

export default router