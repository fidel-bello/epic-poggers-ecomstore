require('dotenv').config();

const config = module.exports = {
  PORT: process.env.PORT || '3006',
  URI: process.env.URI,
  NODE_ENV: process.env.NODE_ENV
}