import mongoose, { model, Model, Schema } from "mongoose";
import { IConversation } from "../interfaces/conversation.interface";

const conversationSchema = new mongoose.Schema<IConversation>({
    userId: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default <Model<IConversation>>model('conversation', conversationSchema)
