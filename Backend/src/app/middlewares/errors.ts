import { Request, Response, NextFunction} from 'express'
import { Error_Handler } from '../utils/errorHandling'

//middleware for the Error_Handler class (express middlewares)

export  = (err: Error_Handler, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {

        res.status(err.statusCode)
        res.json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err};
        error.message = err.message;

        if(err.name === 'CastError'){
            const message = `Not found. Invalid:  ${err.path}`;
            error = new Error_Handler(message, 400);
        }

        if(err.name === 'ValidatorError') {
            const message = Object.values(err.errors instanceof Error).map(value => value.message)
            error = new Error_Handler(message, 400);

        }

        res.status(res.statusCode).json({
            success: false,
            message: error.message
        })
    
    }
}

