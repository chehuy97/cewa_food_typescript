import express, {Express, Request, Response, NextFunction} from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { foodRouter } from '../routes/food';
import { error } from '../middlewares/error';
import { storeRouter } from '../routes/store';

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
    app.use('/',(req: Request, res: Response) => {
      res.send('Welcom eto Cewa food.');
   })
    app.use('/api/foods', foodRouter)
    app.use('/api/stores',storeRouter)
      
    app.use(error)


}