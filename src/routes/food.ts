import express, { Router} from 'express';
import { getAllFoods } from '../controllers'

export const foodRouter:Router = express.Router()

foodRouter.get('/', getAllFoods)