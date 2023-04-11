var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var gadget = require("./models/gadget");

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gadgetsRouter = require('./routes/gadget');
var boardsRouter = require('./routes/board');
var selectorRouter = require('./routes/selector');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gadget', gadgetsRouter);
app.use('/board', boardsRouter);
app.use('/selector', selectorRouter);


// We can seed the collection if needed on server start
async function recreateDB(){
 // Delete everything
 await gadget.deleteMany();
 
 let instance1 = new
 gadgets({
   gadget_type:"Television",gadget_price :2000.00,gadget_version:"Samsung S95B OLED"
 });
 instance1.save( function(err,doc) {
     if(err) return console.error(err);
     console.log("First object saved")
   });

  /** let instance2 = new
 gadgets({
   gadget_type:"Phone",gadget_price :5000.00,gadget_version:"Apple 13 pro"
 
 });
instance2.save( function(err,doc) {
     if(err) return console.error(err);
     console.log("Second object saved")
   });

   let instance3 = new
 gadgets({
   gadget_type:"Tablet",gadget_price :7000,gadget_version:"iPAD 12"
 });
 instance3.save( function(err,doc) {
     if(err) return console.error(err);
     console.log("Third object saved")
   });*/
}
let reseed = true;
if (reseed) { recreateDB();}

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
