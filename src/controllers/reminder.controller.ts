import { IReminder, reminderSchema } from './../models';
import { Request, Response } from 'express'
import { SuccessResponse, BadRequest } from '../helpers'
import mongoose from 'mongoose'

const Reminder = mongoose.model<IReminder>('reminder', reminderSchema, 'reminder')

export const fetch_all_reminder = async (req: Request, res: Response) => {
    try {
        let account_id = req.params.account_id
        let reminders = await Reminder.find({account_id: account_id}).exec()
        SuccessResponse(res, reminders)      
    } catch (error) {
        BadRequest(res, error)
    }
}

export const add_new_reminder = async (req: Request, res: Response) => {
    try {
        let reminderRequest = req.body as IReminder
        let newReminder =  new Reminder(reminderRequest)
        let result = await newReminder.save()
        SuccessResponse(res, result, 201)
    } catch (err) {
        BadRequest(res, err)
}
}



export const edit_reminder = async (req: Request, res: Response) => {
    try {
        let reminderRequest = req.body as IReminder
        let reminder = await Reminder.findByIdAndUpdate(reminderRequest.id,
            {$set: reminderRequest},
            { new: true, useFindAndModify: true})
            SuccessResponse(res, reminder)
    } catch(err) {
        BadRequest(res, err)
    }
}

export const remove_reminder = async (req: Request, res: Response) => {
    try {
        let reminder_id = req.body.reminder_id
        let result = await Reminder.findByIdAndRemove(reminder_id).exec()
        SuccessResponse(res, result)
    } catch(err) {
        BadRequest(res, err)
    }
} 