import express, { Router, Request, Response } from 'express';

export const foodRouter:Router = express.Router()

foodRouter.get('/', (req: Request, res: Response) => {
    res.send("Show food dish")
})