import config from 'config';
import { HTTP } from "./app";
import { Database } from './app/config/database';
import router from "./app/routes";


const dbConnection = new Database(config.get('URI'));
const app = new HTTP.HttpServer(config.get('PORT'), router);
dbConnection.connectionMongo();
app.init();