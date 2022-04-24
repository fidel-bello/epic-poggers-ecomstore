import express from 'express';
import cors from 'cors';
import errors from '../middlewares/errors';
import { Error_Handler } from '../utils/errorHandling';



// import { Core } from '../framework';

// Core.App = Core.Application.ApplicationCreate({appName: 'ecom'});
// const { App } = Core;
const expressApp = express();
expressApp.use(cors());
expressApp.use(express.urlencoded({extended: true}));
expressApp.use(express.json());


export class HttpServer {
  private app = expressApp;
  private _router: express.Router;
  private _port: string;
  private _nodeEnv: string;
  private _middlewares = errors;

  constructor(port: string, nodeEnv: string, router: express.Router) {
    this._port = port;
    this._router = router;
    this._nodeEnv = nodeEnv;
    this.useRouter();
  }

  public set port(port: string) {
    this._port = port;
  }

  public get port(): string {
    return this._port;
  }
  
  public set router(router: express.Router) {
    this._router = router;
    this.useRouter();
  }

  public get router(): express.Router {
    return this._router;
  }

  public set nodeEnv(nodeEnv: string){
    this._nodeEnv = nodeEnv;
  }

  public get nodeEnv(): string {
    return this._nodeEnv;
  }

  private useRouter() {
    this.app.use(this._router);
    this.app.use(this._middlewares);
  }

  public init() {
    
    const server = this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port} in ${this.nodeEnv} mode\n`);
    });

    process.on('unhandledRejection', (err: Error_Handler) => {

      //unhandled promise rejection immediately shut down server
      console.log(`ERROR: ${err.stack}`);
      console.log('Server closing due to Unhandled Rejection');

      server.close(() => {
        process.exit(1);
      });
    });


  };
};