'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const api = require('./router');
//const ProductCtrl = require('./controllers/productos')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/',api);





module.exports = app