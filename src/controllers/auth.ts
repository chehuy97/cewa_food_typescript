import { Request, Response } from 'express'
import { SuccessResponse, BadRequest, NotFound } from '../helpers'
import { IUser, userSchema, UserLogin } from '../models'
import mongoose from 'mongoose'
import { generate_token, verify_token } from '../helpers/jwt.helper'

const ACCESS_TOKEN_LIFE = '2h'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'chequanghuy.9101997'
const REFRESH_TOKEN_LIFE = '3650d'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'chehuy.refresh.1997'


const User = mongoose.model<IUser>('user', userSchema, 'user')

export const login = async (req: Request, res: Response) => {
    try {
        let loginInfo = req.body as UserLogin
        console.log("Login info is "+ loginInfo.email);
        
        let user = await User.findOne({$and:[
            {email:{$eq:loginInfo.email}},
            {password:{$eq: loginInfo.password}}
            ]
        }).exec()
        
        if(user){            
            let access_token = await generate_token(user as IUser, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE)
            let refresh_token = await generate_token(user as IUser, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE)
        
            SuccessResponse(res,{access_token, refresh_token})
        } else {
            NotFound(res, "Account is wrong")
        }
    } catch (err) {   
        BadRequest(res, err)
    }
}

export const refresh_token = async (req:Request, res:Response) => {
    let token = req.body.refresh_token
    if (token){
        try {
            let decoded = await verify_token(token, REFRESH_TOKEN_SECRET) as any
    
            let user = decoded.data as IUser
            console.log("username is " + user.name);
            
            let new_access_token = await generate_token(user, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE)
    
            SuccessResponse(res, {new_access_token})
        } catch(err) {
            BadRequest(res, 'Wrong refresh token')
        }
    } else {
        NotFound(res,'Not found refresh token')
    }
}

export const register_account = async (req:Request, res:Response) => {
    try {
        const { ...storeRequest } = req.body as IUser
        var newStore = new User(storeRequest)
        const result = await newStore.save()
        SuccessResponse(res, result, 201)
    } catch (err) {
        BadRequest(res, err)
    }
}