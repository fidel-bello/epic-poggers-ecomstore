import { HTTP } from "./app";
import router from "./app/Routes";

const app = new HTTP.HttpServer();

app.router = router;

app.init();