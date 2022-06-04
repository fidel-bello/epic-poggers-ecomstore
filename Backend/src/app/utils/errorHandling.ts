/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
export class Error_Handler extends Error {
    [x: string]: any;

    private _statusCode: number;

    public path: any;

    public value: any;

    constructor(message: any, statusCode:number) {
      super(message);

      this._statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }

    public set statusCode(statusCode: number) {
      this._statusCode = statusCode;
    }

    public get statusCode(): number {
      return this._statusCode;
    }
}
