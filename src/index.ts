import express, {Express} from 'express';
import {logging, database, routes, production} from './startups';
import {EnvironmentVariable} from './config'

const app:Express = express();

logging();
database()
production(app);
routes(app);

const port: string | number = 5000;

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

module.exports = server;

