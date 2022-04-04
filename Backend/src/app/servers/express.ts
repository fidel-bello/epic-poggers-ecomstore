import express from 'express';
import cors from 'cors';
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

  constructor(port: string, router: express.Router) {
    this._port = port;
    this._router = router;
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

  private useRouter() {
    this.app.use(this._router);
  }

  public init() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}\n`);
    })
  }
}