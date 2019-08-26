const log_startup = require('debug')('LOG:STARTUP::');
const log_info = require('debug')('LOG:INFO::');
const config = require('config');
const log_http = require('morgan');
const helmet = require('helmet');
const books = require('./routes/books');
const home = require('./routes/home');
const express = require('express');
const path = require('path');
const app = express();

/* Middlewares: 
   express.json : Parse JSON Object requested from the client
   express.urlencoded: Parse form data
   express.static: For importing static files such as css
*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.static('public'));
app.use(helmet());

app.use('/',home);
app.use('/api/books/', books);

if(app.get('env') === 'development'){
    app.use(log_http('tiny'));
    log_startup('Morgan Enabled...');
}

log_startup(`Starting Application: ${config.get('name')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => log_startup(`Listening Connection Over Port: ${port}`));