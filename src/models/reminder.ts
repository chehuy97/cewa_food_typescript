import { Schema, SchemaTypes, Document, SchemaType } from 'mongoose'

const normalize = require('normalize-mongoose')

export const reminderSchema:Schema = new Schema({
    title:String,
    content:String,
    time: Date,
    account_id: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }
})

export interface IReminder extends Document {
    title:string,
    content:string,
    time: Date,
    account_id:string
}


reminderSchema.plugin(normalize)