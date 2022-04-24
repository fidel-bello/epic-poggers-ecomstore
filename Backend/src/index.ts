import config from 'config';
import { HTTP } from "./app";
import { Database } from './app/config/database';
import router from "./app/routes";
import { Error_Handler } from './app/utils/errorHandling';

process.on('uncaughtException', (err: Error_Handler) => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server due to uncaught exception')
});

const dbConnection = new Database(config.get('URI'));
dbConnection.connectionMongo();
const app = new HTTP.HttpServer(config.get('PORT'), config.get('NODE_ENV'), router);
app.init();