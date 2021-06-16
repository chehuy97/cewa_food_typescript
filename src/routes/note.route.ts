import express, { Router, Request, Response } from 'express';
import { get_all_notes, add_new_note, edit_note, remove_note } from '../controllers/note.controller'
import { is_auth } from '../middlewares/auth';
import { noteSchema } from '../models';

export const noteRouter: Router = express.Router()

noteRouter.use(is_auth)
noteRouter.post('/',add_new_note)
noteRouter.put('/', edit_note)
noteRouter.delete('/',remove_note)
noteRouter.get('/:account_id', get_all_notes)