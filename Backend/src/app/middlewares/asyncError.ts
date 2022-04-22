import { Request, Response, NextFunction } from "express";

export  = (func) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next))
        .catch(next);