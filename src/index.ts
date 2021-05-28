import express, {Express} from 'express';
import {logging, database, routes, production} from './startups';
import {EnvironmentVariable} from './config'
import dotenv from 'dotenv'

const app:Express = express();
dotenv.config()

logging();
database()
production(app);
routes(app);

const port: string | number = process.env.PORT || 5000;

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

module.exports = server;

