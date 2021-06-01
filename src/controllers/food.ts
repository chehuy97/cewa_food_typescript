import { Request, Response } from 'express'
import {logger} from '../helpers'
import {SuccessResponse, BadRequest} from '../helpers'
import {Foods} from '../mock/dummy-data'
import { foodSchema, IFood, IStore, storeSchema } from '../models'
import mongoose from 'mongoose'

const Food = mongoose.model<IFood>('food', foodSchema, 'food')
const Store = mongoose.model<IStore>('store',storeSchema,'store')

export const getAllFoods = async (req:Request,res:Response) => {
    try {
        let id = req.params.storeId
        let data = await Food.find({store: id}).populate('store').exec()
        
        SuccessResponse(res,data)
    } catch(err){
        BadRequest(res, err)
    }
}

export const addFoodInStore = async (req:Request, res:Response) => {
    try {
        let {...foodItem} = req.body as IFood     
        let newFood = new Food(foodItem)
        let result =  await newFood.save()
        await Store.findByIdAndUpdate(foodItem.store,
            {$push: {foods: newFood.id}},
            { new: true, useFindAndModify: true})
        SuccessResponse(res, result, 201)
    } catch(err){
        BadRequest(res, err)
    }
}