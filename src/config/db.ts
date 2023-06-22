import mongoose from "mongoose";

export const DBCONNECTION = (db_url: string) => {
    return mongoose.connect(db_url)
}
