import express, { Router, Request, Response } from 'express';
import { getStores, addNewStore, saveFavoriteStore, show_store_favorites } from '../controllers'
import { is_auth } from '../middlewares/auth';
import { storeSchema } from '../models';

export const storeRouter: Router = express.Router()

storeRouter.route('/').post(addNewStore)
storeRouter.route('/:search').get(getStores)

storeRouter.use(is_auth)

storeRouter.route('/favorite')
    .post(saveFavoriteStore)
storeRouter.route('/favorite/:id').get(show_store_favorites)
