import config from 'config';
import { HTTP } from "./app";
import router from "./app/Routes";

const app = new HTTP.HttpServer(config.get('PORT'), router);
app.init();