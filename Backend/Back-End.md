## Typescript Rules 
* indent no more then two spaces -- will cause errors
* Switch cases - one space
* member expresions - pne space
* strings will be single quotes, except jsx rules which are double quotes
  
## Starting scripts
* will have to install packages with npm install
* npm run build
* npm run dev
* npm run prod
* server should run
* will make scripts to do it concurrently


## Formatting
* Classes will be snake cased with capital letters
* functions and methods will be camel cased
* variables will be snake cased with lowercase letters

## Tests
* before pushing make sure API's are working with POSTMAN or other platform for API testing. 

## Directories
* everything will be in the Src/App directory
* Config
* Controllers
* middlewares
* models
* routes
* utils

-- what will the directories contain? --

## Config
* database file
* the connection function,, connection strings or passwords will be contained in a hidden env so it doesn't push up to github repo
* the env variables are: <br>NODE_ENV = DEVELOPMENT <br>NODE_ENV = PRODUCTION <br>URI = mongodb+srv://[username]:[password]@cluster0.q85xi.mongodb.net/[database] <br>JWT_EXPIRATION = 7d <br> JWT_SECRET = YOURSECRET98754321ROSESARERED <br> MAIL_HOST = smtp.mailtrap.io <br> MAIL_PORT = <br>MAIL_USER = <br>MAIL_PASSWORD = <br>FROM_EMAIL = noreply@poggerstore.com<br>FROM_NAME = Poggerstore

## Controllers
* This will contain all requests
* authcontroller
* ordercontroller
* productcontrollers

## models
* we will have models here
* user
* product
* orders

## routes
* routes will be put here
* auth
* products
* orders

## utils
* extra features can be put here
