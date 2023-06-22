import { Types } from "mongoose";

export interface IConversation {
    userId: string | Types.ObjectId;
    message: string;
}