import * as express from 'express'
import { Error_Handler } from '../utils/errorHandling'

//middleware for the Error_Handler class (express middlewares)

export = (err: Error_Handler, req: express.Request, res: express.Response, next: express.NextFunction ): void => {
    err.statusCode || 500;
    err.message || 'Internal Server Error';

    res.status(err.statusCode);
    res.json({
        success: false,
        error: err.stack
    })
}

