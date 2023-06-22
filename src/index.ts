import app from "./api/v1/app";
import dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.DB_URI || '')
