import { EnvironmentVariable } from '../config'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

export const database = () => {
    dotenv.config()
    mongoose.connect("mongodb+srv://dbCewa:huy9101997@cewa.nvyu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {
        var db = mongoose.connection
        if(db){
            console.log("CONNECT DB SUCCESS");
            
        } else {
            console.log("CONNECT DB ERROR");
            
        }
    })
    
}