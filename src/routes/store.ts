import express, { Router, Request, Response} from 'express';
import { getStores, addNewStore } from '../controllers'
import { is_auth } from '../middlewares/auth';
import { storeSchema } from '../models';

export const storeRouter:Router = express.Router()

storeRouter.route('/').post(addNewStore)

storeRouter.use(is_auth)

storeRouter.route('/:search').get(getStores)

