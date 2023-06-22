import mongoose, { model, Model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema<any>({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    phone: {
        type: String,
        required: true,
    },

    plan: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free'
    },

    password: {
        type: String,
        minLength: 8,
        required: true,
        select: false
    },
}, { timestamps: true })

export default <Model<any>>model('user', userSchema)
