import express, {Express} from 'express';
import {logging, routes, production} from './startups';
import {EnvironmentVariable} from './config'

const app:Express = express();

logging();
production(app);
routes(app);

const port: string | number = EnvironmentVariable.PORT || 3000;

const server = app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

module.exports = server;

