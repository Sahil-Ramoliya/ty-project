var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const cloudinary = require('cloudinary').v2;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var productManager = require('./routes/productManager');
var addToCard = require('./routes/addToCart');
var checkOut = require('./routes/checkOut');

var app = express();

// Configure Cloudnary

cloudinary.config({ 
  cloud_name: 'dspy4pj4h', 
  api_key: '487214647635983', 
  api_secret: '84SXiadDuw3SArQK1b42bMI9erU',
  secure: true
});

console.log(cloudinary.config().secure);+

// view engine setup

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/productManager', productManager);
app.use('/addtocart', addToCard);
app.use('/checkout', checkOut);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
