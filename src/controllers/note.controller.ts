import { Request, Response } from 'express'
import { SuccessResponse, BadRequest } from '../helpers'
import mongoose from 'mongoose'
import { noteSchema, INote, IUser, userSchema } from '../models'

const Note = mongoose.model<INote>('note', noteSchema, 'note')
const User = mongoose.model<IUser>('user', userSchema, 'user')


export const get_all_notes = async (req: Request, res: Response) => {
    try {
        let account_id = req.params.account_id
        let notes = await Note.find({account_id: account_id}).exec()
        SuccessResponse(res, notes)      
    } catch (error) {
        BadRequest(res, error)
    }
}

export const add_new_note = async (req: Request, res: Response) => {
    try {
        let noteRequest = req.body as INote
        let newNote =  new Note(noteRequest)
        let result = await newNote.save()
        SuccessResponse(res, result, 201)
    } catch (err) {
        BadRequest(res, err)
    }
}

export const edit_note = async (req: Request, res: Response) => {
    try {
        let noteRequest = req.body as INote
        let note = await Note.findByIdAndUpdate(noteRequest.id,
            {$set: noteRequest},
            { new: true, useFindAndModify: true})
            SuccessResponse(res, note)
    } catch(err) {
        BadRequest(res, err)
    }
}

export const remove_note = async (req: Request, res: Response) => {
    try {
        let note_id = req.body.note_id
        let result = await Note.findByIdAndRemove(note_id).exec()
        SuccessResponse(res, result)
    } catch(err) {
        BadRequest(res, err)
    }
} 