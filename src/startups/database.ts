import { EnvironmentVariable } from '../config'
import mongoose from 'mongoose'

export const database = () => {
    mongoose.connect(EnvironmentVariable.DATABASE_CONNECTION || "",{
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