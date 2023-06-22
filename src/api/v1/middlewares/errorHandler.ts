import { NextFunction, Request, Response } from "express";
import HttpError from "../helpers/HttpError";

export const errorHandler = (err: HttpError | Error, req: Request, res: Response, next: NextFunction) => {

    let error: any

    if(typeof err == 'object') error = { ...err }
    else if (typeof err === 'string') error.message = err;
    error.message = err.message;

    if (err instanceof HttpError) error.data = err.data;
    else error.data = null;

    error.message = err.message;
    let statusCode: number;
    
    if ('statusCode' in error) {
        statusCode = error.statusCode;
    } else if ('code' in error) {
        statusCode = parseInt(error.code, 10);
        statusCode = statusCode || 500;
    } else if (error.message === 'jwt expired') {
        statusCode = 401;
    } else {
        statusCode = 500;
    }
    // let message = 'Server Error';
    // if (statusCode < 500) message = 'Client Error';
    res.status(statusCode).json({
        success: false,
        message: error.message,
        data: error.data,
    });
}   
