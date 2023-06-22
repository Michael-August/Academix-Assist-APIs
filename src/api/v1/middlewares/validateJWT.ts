import jwt from 'jsonwebtoken'
import HttpError from '../helpers/HttpError';
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

export const JWTVerification = async (req: any, res: Response, next: NextFunction) => {
    try {
        const tokenExist: any = req.headers.authorization

        if(!tokenExist || tokenExist.split(" ")[0] !== "Bearer") {
            throw new HttpError("No token is provided, please provide a toke", 404)
        }
        
        const token = tokenExist.split(" ")[1];
        // const user = jwt.decode(token)
        const decoded = <any>jwt.verify(token, `${process.env.JWT_SECRET}`);
        const user = await User.findOne({email: decoded.email})

        if (!user) {
            throw new HttpError('User not found', 400)
        }
        
        req.user = user._doc
        next();
    } catch (error) {
        next(error)
    }
};