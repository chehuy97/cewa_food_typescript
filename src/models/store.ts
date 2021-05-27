import { Schema, SchemaTypes, Document } from 'mongoose'
const normalize = require('normalize-mongoose')

export const storeSchema:Schema = new Schema({
    name: String,
    address: String,
    type:String,
    rating:Number,
    image:{
        type:String,
        default:'https://images.foody.vn/res/g27/263004/prof/s1242x600/beauty-upload-api-image-200805140406.jpeg'
    }
})

export interface IStore extends Document {
    name:string,
    address:string,
    type:string,
    rating:string,
    image:string
}

export interface StoreRequest {
    name:string,
    address:string,
    type:string,
    rating:string,
    image:string,
}

storeSchema.plugin(normalize)