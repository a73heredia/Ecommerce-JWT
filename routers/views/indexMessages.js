import { Router } from 'express'
import messageModel from '../../models/message.js'

const routerVistaMensaje = Router()

routerVistaMensaje.get('/', async (req, res) => {
  const mensajes = await messageModel.find().lean()
  const scripts = { socket: '/socket.io/socket.io.js', index: 'javascripts/index.js', mensajes: mensajes}
  res.render('messages', scripts)
})

export default routerVistaMensaje