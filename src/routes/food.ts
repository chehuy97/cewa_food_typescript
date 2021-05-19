import express, { Router, Request, Response } from 'express';
import { getAllFoods } from '../controllers'

export const foodRouter:Router = express.Router()

foodRouter.get('/', getAllFoods)