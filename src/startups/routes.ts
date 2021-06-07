import express, {Express, Request, Response, NextFunction} from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { foodRouter } from '../routes/food';
import { error } from '../middlewares/error';
import { storeRouter } from '../routes/store';
import { homeRouter } from '../routes/home';
import { authRouter } from '../routes/auth';
import { is_auth } from '../middlewares/auth'
const accessRouter = express.Router()

export const routes = (app: Express) => {
   app.use(cors({origin: '*', credentials: true}));
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.json());
   app.use(express.json());
   app.use(morgan('tiny'));
   app.use(cookieParser());

   app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
      );
      next();
    });
    app.use('/',homeRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/foods', foodRouter)
    //accessRouter.use(is_auth)
    app.use('/api/stores',storeRouter)
      
    app.use(error)


}