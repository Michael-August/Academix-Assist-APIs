import express, { Router } from "express";
import messageController from '../controllers/message.controller'

class MessageRoutes {
    router: Router
    controller: any

    constructor() {
        this.router = express.Router()
        this.controller = messageController
    }

    initRoutes() {
        this.router.route('/:conversationId')
            .get(this.controller.getMessages)

        this.router.route('/')
            .post(this.controller.createMessage)
        return this.router
    }
}

export default new MessageRoutes()