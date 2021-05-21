import { Schema, SchemaTypes, Document } from 'mongoose'
const normalize = require('normalize-mongoose')

export const foodSchema:Schema = new Schema({
    name: String,
    description:String,
    price: Number,
    is_popular:Boolean,
    store_id: {
        type: SchemaTypes.ObjectId,
        ref: 'store'
    }
})

export interface IFood extends Document {
    name:string,
    description:string,
    is_popular:boolean,
    store_id:string

}

foodSchema.plugin(normalize)