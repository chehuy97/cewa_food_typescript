import express, { Router, Request, Response} from 'express';
import { getStores, addNewStore,saveFavoriteStore } from '../controllers'
import { is_auth } from '../middlewares/auth';
import { storeSchema } from '../models';

export const storeRouter:Router = express.Router()

storeRouter.route('/').post(addNewStore)
storeRouter.route('/:search').get(getStores)

storeRouter.use(is_auth)

storeRouter.get('/haha/hihi',(req: Request, res: Response) => {
    res.send('Test login.');
 })

 storeRouter.route('/user/favorite').post(saveFavoriteStore)