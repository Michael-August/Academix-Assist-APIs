import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import HttpError from '../helpers/HttpError'

class AuthController {

    constructor() {

    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ email: req.body.email }).select('+password')
            if(!user) {
                throw new HttpError('Invalid creden••••••••tials, check and try again', 401)
            }

            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
            if(!isPasswordCorrect) {
                throw new HttpError('Invalid credentials, check and try again', 401)
            }

            const token = jwt.sign({ id: user?._id, email: user?.email, phone: user?.phone }, `${process.env.JWT_SECRET}`)
            const { password, ...loggedinUser } = user._doc
            const result = { loggedinUser, access_token: token }
            res.status(200).json({ success: true, message: 'OK', data: result })

        } catch (error) {
            next(error)
        }

    }

    async register (req: Request, res: Response, next: NextFunction) {
        const salt = await bcrypt.genSalt(10)
        const hash = bcrypt.hashSync(req.body.password)

        try {
            const userExist = await User.findOne({ email: req.body.email })
            if(userExist) {
                throw new HttpError('User already exist', 400)
            }

            req.body.password = hash
            const newUser = await User.create(req.body)
            res.status(201).json({ success: true, message: 'OK', newUser  })

        } catch (error) {
            next(error)
        }
    }
}

export default new AuthController()
