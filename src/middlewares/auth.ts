import {generate_token, verify_token} from '../helpers/jwt.helper'  
import { Request, Response } from 'express'
import { Unauthorized, NotFound } from '../helpers/error'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "cheuy09101997"

export const is_auth = async (req:Request, res:Response, next: () => void) => {
    let tokenFromClient = req.body.token || req.query.token || req.headers["access-token"]

    if (tokenFromClient) {
        try {
            const decoded = await verify_token(tokenFromClient,accessTokenSecret) as any

            req.params.jwtDEcoded = decoded

            next()
            
        } catch(err) {
            Unauthorized(res,"Unauthorized", 401)
        }
    } else {
        NotFound(res,'Token not found',404)
    }
}