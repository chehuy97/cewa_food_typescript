import express, { Router} from 'express';
import { getAllStores, addNewStore } from '../controllers'

export const storeRouter:Router = express.Router()

storeRouter.route('/')
            .get(getAllStores)
            .post(addNewStore)