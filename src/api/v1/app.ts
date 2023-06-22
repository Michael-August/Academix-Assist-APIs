import express, { Application } from 'express'
import dotenv from 'dotenv'
import { DBCONNECTION } from '../../config/db';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import conversationRoutes from './routes/conversation.routes';
import messageRoutes from './routes/message.routes';
import { JWTVerification } from './middlewares/validateJWT';

dotenv.config()

class App {

    private app: Application;
    private PORT = process.env.PORT || '3500'
    private apiVersion = '/api/v1'

    constructor() {
        this.app = express();
        this.initMiddlewares()
        this.initRoutes()
        this.initErrorHandlers()
    }

    private initMiddlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private initRoutes() {
        this.app.use(`${this.apiVersion}`, authRoutes.initRoutes())
        this.app.get('/', (req: any, res: any) => {
            res.status(200).json({ msg: "WELCOM TO ACADEMIX-ASSIST :)" })
        })

        this.app.use(JWTVerification)
        this.app.use(`${this.apiVersion}/conversation`, conversationRoutes.initRoutes())
        this.app.use(`${this.apiVersion}/message`, messageRoutes.initRoutes())
    }

    private initErrorHandlers() {
        this.app.use(errorHandler)
        this.app.use('*', (req, res) => {
            res.status(404).json({ msg: 'Route not found' });
        });
    }

    async listen(dbConnection: string) {
        try {
            await DBCONNECTION(dbConnection)
            this.app.listen(this.PORT, () => console.log(`serve started on ${this.PORT}`))
        } catch (error) {
            console.log(error)
        }
    }
    
}

export default new App()
