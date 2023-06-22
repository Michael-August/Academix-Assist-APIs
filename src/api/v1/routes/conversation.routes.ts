import express, { Router } from "express";
import coversationController from '../controllers/conversation.controller'

class ConversationRoutes {
    router: Router
    controller: any

    constructor() {
        this.router = express.Router()
        this.controller = coversationController
    }

    initRoutes() {
        this.router.route('/:userId')
            .get(this.controller.getConversations)
        return this.router
    }
}

export default new ConversationRoutes()
