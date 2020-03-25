'use strict';

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieSession = require('cookie-session');
let logger = require('morgan');

let app = express();

// Generate file paths relative to the project root directory
app.root = (...args) => path.join(__dirname, ...args);

// Helper functions to check which environment we're in
app.inEnvironment = (env) => app.get('env') === env;
app.inProduction = () => app.inEnvironment('production');
app.inTesting = () => app.inEnvironment('testing');
app.inDevelopment = () => app.inEnvironment('development');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.get('env');
}

if (process.env.EXPRESS_SESSION_SECRET) {
  app.set('session-secret', process.env.EXPRESS_SESSION_SECRET);
} else {
  app.set('session-secret', 'this-is-a-bad-secret');
}

app.set('views', app.root('views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let sessionHandler = cookieSession({
  name: 'session',
  secret: app.get('session-secret'),
});

app.use(sessionHandler);

app.use(express.static(app.root('public')));

// Tell Knex how to connect to our database
// See config/database.js
let Knex = require('knex');
let dbConfig = require(app.root('knexfile'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);

let { Model } = require('objection');
Model.knex(knex);

let loadUser = require('./loadUser');
app.use(loadUser);

let routes = require('./routes');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
