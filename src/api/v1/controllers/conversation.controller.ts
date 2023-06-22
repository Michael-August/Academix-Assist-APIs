import { NextFunction, Request, Response } from "express";
import Conversation from "../models/Conversation";

class ConversationController {

    constructor() {

    }

    async getConversations(req: any, res: Response, next: NextFunction) {
        try {
            console.log(req.user)
            const conversations = await Conversation.find({ userId: req.params.userId })
            res.status(200).json({ success: true, message: "OK", data: conversations })
        } catch (error) {
            next(error)
        }
    }
}

export default new ConversationController
