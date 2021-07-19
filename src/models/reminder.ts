import { Schema, SchemaTypes, Document, SchemaType } from 'mongoose'

const normalize = require('normalize-mongoose')

export const reminderSchema:Schema = new Schema({
    title:String,
    content:String,
    color:{
        type: String,
        default: '#fff380'
    },
    time: Date,
    account_id: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }
})

export interface IReminder extends Document {
    title:string,
    content:string,
    color:string
    time: Date,
    account_id:string
}


reminderSchema.plugin(normalize)