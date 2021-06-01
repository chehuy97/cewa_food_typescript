import { Schema, SchemaTypes, Document, SchemaType } from 'mongoose'
const normalize = require('normalize-mongoose')

export const foodSchema:Schema = new Schema({
    name: String,
    description:String,
    price: String,
    image:{
        type:String,
        default: "https://images.foody.vn/res/g29/287931/s750x750/236f327f-13b3-4aea-a91e-1e4ec4a9-f7b7b798-200907104523.jpeg"
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'store'
    }
})

export interface IFood extends Document {
    name:string,
    description:string,
    price:string,
    image:string,
    store:string
}

// export interface FoodRequest {
//     name:string,
//     description:string,
//     price:string,
//     image:string,
//     store_id:string
//}


foodSchema.plugin(normalize)