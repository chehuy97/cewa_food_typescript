import { IUser } from './user';
import { Schema, SchemaTypes, Document, SchemaType } from 'mongoose'
const normalize = require('normalize-mongoose')

export const noteSchema:Schema = new Schema({
    title:String,
    content:String,
    color:{
        type: String,
        default: '#fff380'
    },
    users: [{
        type: SchemaTypes.ObjectId,
        ref: 'user',
        default: []
    }]
})

export interface INote extends Document {
    id:string,
    title:string,
    content:string,
    users:IUser[]
}


noteSchema.plugin(normalize)