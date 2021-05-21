import { Request, Response } from 'express'
import { logger } from '../helpers'
import { SuccessResponse, BadRequest } from '../helpers'
import mongoose from 'mongoose'
import { storeSchema, IStore, StoreRequest } from '../models'

const Store = mongoose.model<IStore>('store', storeSchema, 'store')

export const getAllStores = async (req: Request, res: Response) => {
    try {
        let result = await Store.find()
        SuccessResponse(res,result)
    } catch (error) {
        BadRequest(res,error)
    }
}

export const addNewStore = async (req: Request, res: Response) => {
    try {
        const { ...storeRequest } = req.body as StoreRequest
        var newStore = new Store(storeRequest)
        const result = await newStore.save()
        SuccessResponse(res, result, 201)
    } catch (err) {
        BadRequest(res, err)
    }
}