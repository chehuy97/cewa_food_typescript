import express, { Router} from 'express';
import { getStores, addNewStore } from '../controllers'
import { storeSchema } from '../models';

export const storeRouter:Router = express.Router()

storeRouter.route('/').post(addNewStore)

storeRouter.route('/:search').get(getStores)