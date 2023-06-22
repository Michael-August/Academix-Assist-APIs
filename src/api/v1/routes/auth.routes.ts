import express, { Router } from "express";
import authController from "../controllers/auth.controller";

class AuthRoutes {
    router: Router
    controller: any

    constructor() {
        this.router = express.Router()
        this.controller = authController
    }

    initRoutes() {
        this.router.route('/register')
            .post(this.controller.register)
        this.router.route('/login')
            .post(this.controller.login)
        return this.router
    }
}

export default new AuthRoutes()
