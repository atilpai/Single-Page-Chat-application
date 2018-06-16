// app.js
var express = require('express');
var app = express();
var db = require('./mongodbConnect');

var UserController = require('./user/UserController');

//Enabling CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//Setting up Component route
app.use('/users/', UserController);

module.exports = app;
