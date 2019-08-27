const log_startup = require('debug')('LOG:STARTUP::');
const log_info = require('debug')('LOG:INFO::');
const config = require('config');
const log_http = require('morgan');
const helmet = require('helmet');
const books = require('./routes/books');
const home = require('./routes/home');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost/booksdB',{useNewUrlParser: true, useFindAndModify: false})
        .then(() => log_startup('Connection to MongoDb Successfull!'))
        .catch(err => log_startup('Connection failed! Error: ',err));

app.use(bodyParser.json());

app.use(function (error, req, res, next) {
    if(error instanceof SyntaxError){
        return res.status(400).send('ERROR 400: Bad Request!!!');
      } 
    next();
});
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