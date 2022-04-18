import * as express from 'express'
import { Error_Handler } from '../utils/errorHandling'

//middleware for the Error_Handler class (express middlewares)

export = (err: Error_Handler, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode);
        res.json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };
        error.message = err.message;

        res.status(err.statusCode);
        res.json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}

