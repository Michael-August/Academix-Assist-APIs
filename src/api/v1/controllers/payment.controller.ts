import { NextFunction, Request, Response } from "express";
import https from 'http'

class PaymentController {
    constructor() {

    }

    async makePayment(req: Request, res: Response, next: NextFunction) {

        const params = JSON.stringify({
            "email": req.query.email,
            "amount": req.query.amount
        })

        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
                Authorization: `Bearer sk_test_04052555d78b214e99897f430b6e78a9f7548835`,
                'Content-Type': 'application/json'
            }
        }

        const paystackRequest = https.request(options, payStackResponse => {
            let data = ''

            payStackResponse.on('data', (chunk) => {
                data += chunk
            });

            payStackResponse.on('end', () => {
                console.log(data)
            })
        }).on('error', error => {
            console.error(error)
        })

        paystackRequest.write(params)
        paystackRequest.end()
    }

}

export default new PaymentController()