import express, { Router} from 'express';
import { getAllFoodsInStore, addFoodInStore } from '../controllers'

export const foodRouter:Router = express.Router()

foodRouter.route('/').post(addFoodInStore)

foodRouter.get('/:storeId', getAllFoodsInStore)