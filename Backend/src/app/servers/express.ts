import express, { Express } from 'express';
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
  port: string = process.env.PORT || '3006';
  
  public set router(router: express.Router) {
    this.app.use(router);
  }

  public init() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}\n`);
    })
  }
}