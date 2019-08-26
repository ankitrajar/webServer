const debug = require('debug')('APP:STARTUP');
const debugInfo = require('debug')('APP:INFO');
const config = require('config');
const httpLogger = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const books = require('./routes/books');
const home = require('./routes/home');
const express = require('express');
const path = require('path');
const app = express();

//Middlewares
app.use(express.json());
//app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(helmet());

app.use('/',home);
app.use('/api/books/', books);
app.set('view engine','pug');

if(app.get('env') === 'development'){
    app.use(httpLogger('dev'));
    debug('Morgan Enabled...');
}

debugInfo(`Application Name: ${config.get('name')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening over port ${port}...`));