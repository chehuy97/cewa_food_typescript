import { EnvironmentVariable } from '../config'
import mongoose from 'mongoose'

const dbConnection = 'mongodb+srv://dbCewa:huy9101997@cewa.nvyu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

export const database = () => {
    mongoose.connect(dbConnection,{
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