const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('./passport');

const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', auth);
app.use('/api/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const message = err.message;
  const error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.json({message, error});
});

module.exports = app;
