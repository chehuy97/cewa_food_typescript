import { Schema, SchemaTypes, Document, SchemaType } from 'mongoose'
const normalize = require('normalize-mongoose')

export const noteSchema:Schema = new Schema({
    title:String,
    content:String,
    color:{
        type: String,
        default: '#fff380'
    },
    account_id: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }
})

export interface INote extends Document {
    title:string,
    content:string,
    account_id:string
}


noteSchema.plugin(normalize)