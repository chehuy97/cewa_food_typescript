import express, {Router} from 'express'
import { login, refresh_token, register_account } from '../controllers'

export const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/refresh-token', refresh_token)
authRouter.post("/register", register_account)