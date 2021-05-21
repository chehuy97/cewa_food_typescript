import { Schema, SchemaTypes, Document } from 'mongoose'
const normalize = require('normalize-mongoose')

export const storeSchema:Schema = new Schema({
    name: String,
    address: String,
    type:String,
    rating:Number
})

export interface IStore extends Document {
    name:string,
    address:string,
    type:string,
    rating:string
}

export interface StoreRequest {
    name:string,
    address:string,
    type:string,
    rating:string
}

storeSchema.plugin(normalize)