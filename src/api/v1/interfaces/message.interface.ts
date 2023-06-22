import { Types } from "mongoose";

export interface IMessage {
    conversationId: string | Types.ObjectId,
    to: string;
    from: string;
    message: string;
    isNew: boolean;
}