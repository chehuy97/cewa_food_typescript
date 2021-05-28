import express, {Express} from 'express';
import {logging, database, routes, production} from './startups';
import {EnvironmentVariable} from './config'

const app:Express = express();
logging();
database()
production(app);
routes(app);

//const port: string | number = process.env.PORT || 5000;

const server = app.listen(process.env.PORT || 3000, () => {
   console.log(`Listening on port`);
});

module.exports = server;

