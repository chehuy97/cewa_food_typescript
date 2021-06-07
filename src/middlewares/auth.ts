import { generate_token, verify_token } from '../helpers/jwt.helper'
import { Request, Response } from 'express'
import { Unauthorized, NotFound } from '../helpers/error'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "chequanghuy.9101997"

export const is_auth = async (req: Request, res: Response, next: () => void) => {
    let tokenFromClient: string = req.body.token || req.query.token || req.headers["access-token"] as string


    if (tokenFromClient) {
        try {
            console.log("Original token is " + tokenFromClient);
            let stringList = tokenFromClient.split(" ")
            if (stringList[0].toLowerCase() == "bearer") {
                let realToken = stringList[1]
                const decoded = await verify_token(realToken, accessTokenSecret) as any
                req.params.jwtDEcoded = decoded
                next()
            } else {
                Unauthorized(res, "Wrong token format", 401)
            }

        } catch (err) {
            Unauthorized(res, "Unauthorized", 401)
        }
    } else {
        NotFound(res, 'Token not found', 404)
    }
}