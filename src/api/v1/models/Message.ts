import mongoose, { Model, Schema, model } from "mongoose";
import { IMessage } from "../interfaces/message.interface";

const messageSchema = new mongoose.Schema<IMessage>({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'conversation'
    },
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    message: {
        type:  String,
        required: true
    }
}, { timestamps: true })

export default <Model<IMessage>>model('message', messageSchema);
