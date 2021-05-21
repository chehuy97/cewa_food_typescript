import { Request, Response } from 'express'
import {logger} from '../helpers'
import {SuccessResponse} from '../helpers'
import {Foods} from '../mock/dummy-data'


export const getAllFoods = (req:Request,res:Response) => {
    return SuccessResponse(res, Foods)
}