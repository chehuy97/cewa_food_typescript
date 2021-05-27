import express, { Router} from 'express';
import { getStores, addNewStore } from '../controllers'

export const storeRouter:Router = express.Router()

storeRouter.route('/')
            .get(getStores)
            .post(addNewStore)