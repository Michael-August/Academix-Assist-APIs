import { NextFunction, Request, Response } from "express";
import Message from "../models/Message";
import Conversation from "../models/Conversation";

import axios from 'axios'

class MessageController {
    constructor() {

    }

    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const messages = await Message.find({ conversationId: req.params.conversationId })
            res.status(200).json({ success: true, message: "OK", data: messages })
        } catch (error) {
            next(error)
        }
    }

    async createMessage(req: any, res: Response, next: NextFunction) {
        try {
            const newMessage = req.body

            if(newMessage.isNew) {
                // Make request to the model
                let modelPayload = { prompt: req.body.message }
                let externalServiceResponse = await axios.post('http://192.168.201.214:80/generate', modelPayload)
                let aiResponse = externalServiceResponse.data

                const conversation = await Conversation.create({ userId: req.user._id, message: req.body.message })  
                const conversationId = conversation._id
                const message = await Message.create({ from: 'user', to: 'ai', message: req.body.message, conversationId })

                const messageFromAi = await Message.create({ from: 'ai', to: 'user', message: aiResponse, conversationId })

                res.status(201).json({ success: true, message: 'OK', messageFromAi, conversationId })
                
            } else {
                // Make request to the model
                let modelPayload = { prompt: req.body.message }
                let externalServiceResponse = await axios.post('http://192.168.201.214:80/generate', modelPayload)
                let aiResponse = externalServiceResponse.data

                const message = await Message.create({ from: 'user', to: 'ai', message: req.body.message, conversationId: req.body.conversationId })

                const messageFromAi = await Message.create({ from: 'ai', to: 'user', message: aiResponse, conversationId: req.body.conversationId })

                res.status(201).json({ success: true, message: 'OK', messageFromAi })
            }
        } catch (error) {
            next(error)
        }
    }

    async getConversation(req: any, res: Response, next: NextFunction) {
        console.log('Running')
        try {
            let externalServiceResponse = await axios.post('http://192.168.201.214:80/generate', req.body)
            let response = externalServiceResponse.data
            const conversationForAUser = Conversation.findOne({ userId: req.user._id })
            const conversations = await Conversation.find({ conversationId: req.params.conversationId })
            
            res.status(200).json({ success: true, message: "OK", data: response })
        } catch (error) {
            next(error)
        }
    }

}

export default new MessageController()
