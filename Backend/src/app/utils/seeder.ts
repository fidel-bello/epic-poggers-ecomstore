/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import config from 'config';
import { Database } from '../config/database';
import { Product } from '../models/product';

const product_data = require('../data/products.json');

const mongoose_connection = new Database(config.get('URI'));

mongoose_connection.connectionMongo();

const seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log('Products are deleted');

    await Product.insertMany(product_data);
    console.log('all products are inserted');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

seedProduct();
