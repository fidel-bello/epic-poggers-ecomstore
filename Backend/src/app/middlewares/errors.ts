import { Request, Response, NextFunction} from 'express'
import { Error_Handler } from '../utils/errorHandling'

//middleware for the Error_Handler class (express middlewares)

export  = (err: Error_Handler, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode);
        res.json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };

        error.message = err.message;

        res.status(404).json({
            success: false,
            error: err.message
        })

    }
}

