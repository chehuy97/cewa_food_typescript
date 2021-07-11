import express, { Router, Request, Response } from 'express';
import { add_new_reminder, fetch_all_reminder, edit_reminder, remove_reminder } from '../controllers/reminder.controller'
import { is_auth } from '../middlewares/auth';
import { reminderSchema } from '../models';

export const reminderRoute: Router = express.Router()

reminderRoute.use(is_auth)
reminderRoute.post('/',add_new_reminder)
reminderRoute.put('/', edit_reminder)
reminderRoute.delete('/',remove_reminder)
reminderRoute.get('/:account_id', fetch_all_reminder)