import { stringify } from "querystring";
import { IUser } from "../models/user"

const jwt = require('jsonwebtoken');

export const generate_token = (user: IUser, secretSignature: string, tokenLife: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        let userData = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife
            },
            (error: Error, token: string) => {
                if (error) {

                    return reject(error)
                } else {
                    return resolve(token)
                }
            }
        )
    })
}

export const verify_token = (token: string, secretKey: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error: Error, decoded: any) => {
            if (error) {
                return reject(error)
            } else {
                console.log("Data is " + decoded);

                return resolve(decoded)
            }
        })
    })
}