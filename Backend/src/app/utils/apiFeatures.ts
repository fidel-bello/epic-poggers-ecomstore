/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
interface keywords {
    keyword? : string;
    page?: number;
}
export class Api_Features {
  private _query: any;

  private _queryStr: keywords;

  constructor(query: any, queryStr: keywords) {
    this._query = query;
    this._queryStr = queryStr;
  }

  public set query(query: any) {
    this._query = query;
  }

  public get query(): any {
    return this._query;
  }

  public set queryStr(queryStr: keywords) {
    this._queryStr = queryStr;
  }

  public get queryStr(): keywords {
    return this._queryStr;
  }

  public search() {
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i', // case insensitive
      },
    } : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  public pagination(resPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

  public filter() {
    const query = { ...this.queryStr };

    const removeFields = ['keyword', 'limit', 'page'];

    removeFields.forEach((el) => delete query[el]);

    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); // gt = greater,  gte = greater equal

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
}
