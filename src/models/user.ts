import { Schema, SchemaTypes } from 'mongoose'
const normalize = require('normalize-mongoose')

export const userSchema:Schema = new Schema({
    email:String,
    password:String,
    name:String,
    address:String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    birthday:String,
    favorite_store: {type:SchemaTypes.ObjectId, ref: 'store'}
})

export interface IUser extends Document {
    id:string
    email:string,
    password:string,
    name:string,
    address:string,
    gender:string,
    birthday:string,
}

export interface UserLogin {
    email:string,
    password:string
}

userSchema.plugin(normalize)
