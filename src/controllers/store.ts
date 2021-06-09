import { Request, Response } from 'express'
import { SuccessResponse, BadRequest } from '../helpers'
import mongoose from 'mongoose'
import { storeSchema, IStore, StoreRequest, IUser, userSchema } from '../models'

const Store = mongoose.model<IStore>('store', storeSchema, 'store')
const User = mongoose.model<IUser>('user', userSchema, 'user')


export const getStores = async (req: Request, res: Response) => {
    try {
        let search = req.params.search
        let result = await Store.find({
            $or: [
                { name: { $regex: '.*' + search + '.*' } },
                { address: { $regex: '.*' + search + '.*' } },
            ]
        }).exec()
        SuccessResponse(res, result)
    } catch (error) {
        BadRequest(res, error)
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

export const saveFavoriteStore = async (req: Request, res: Response) => {
    try {
        let account_id = req.body.account_id
        let store_id = req.body.store_id
        await User.findByIdAndUpdate(
            account_id,
            { $push: { favorite_store: store_id } },
            { new: true, useFindAndModify: true }
        )
        await Store.findByIdAndUpdate(
            store_id,
            { $push: { favorite: account_id } },
            { new: true, useFindAndModify: true }
        )
        let message = "Add favorited successfully"
        SuccessResponse(res, { message })
    } catch (err) {
        BadRequest(res, err)
    }
}

export const show_store_favorites = async (req:Request, res: Response) => {
    try{ 
        let accountId = req.params.id
        
        let user = await User.findById(accountId).populate('favorite_store', 'id name address type rating').exec()
        if(user){
            console.log("user is "+user);
            let stores = user.favorite_store
            SuccessResponse(res, stores)
        } else {
            BadRequest(res,"User not found")
        }
    } catch (err) {
        BadRequest(res, err)
    }
}
