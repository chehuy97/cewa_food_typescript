import { Schema, SchemaTypes, Document, SchemaType } from 'mongoose'
import { IFood } from './food'
import { IUser } from './user'
const normalize = require('normalize-mongoose')

export const storeSchema:Schema = new Schema({
    name: String,
    address: String,
    type:String,
    rating:Number,
    image:{
        type:String,
        default:'https://images.foody.vn/res/g27/263004/prof/s1242x600/beauty-upload-api-image-200805140406.jpeg'
    },
    foods:[{type: Schema.Types.ObjectId, ref:'food'}],
    favorite: [{type: SchemaTypes.ObjectId, ref: 'user'}]
})

export interface IStore extends Document {
    name:string,
    address:string,
    type:string,
    rating:string,
    image:string,
    foods:IFood[],
    favorite: IUser[]
}

export interface StoreRequest {
    name:string,
    address:string,
    type:string,
    rating:string,
    image:string,
}

storeSchema.plugin(normalize)