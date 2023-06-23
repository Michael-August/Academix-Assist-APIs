import express, { Router } from "express";
import paymentController from '../controllers/payment.controller'

class PaymentRoutes {
    router: Router
    controller: any

    constructor() {
        this.router = express.Router()
        this.controller = paymentController
    }

    initRoutes() {
        this.router.route('/payment')
            .get(this.controller.makePayment)
        return this.router
    }
}

export default new PaymentRoutes()