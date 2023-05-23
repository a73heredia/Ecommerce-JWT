import { Server } from 'socket.io'
import MessageModel from './models/message.js'

let io

export const initS = (httpSever) => {
    io = new Server(httpSever)

    io.on('connection', async(socketClient) => {
        console.log('Nuevo Cliente Conectadp', socketClient.id);

        socketClient.on('new-message', async(data) => {
            const message = await MessageModel.create(data)
            io.emit('notification', message)
        })

        socketClient.on('disconection', () => {
            console.log('Client Disconected with id ', socketClient.id);
        })
    })
}

export const emit = (mensaje) => {
    io.emit('notification', mensaje)
  }