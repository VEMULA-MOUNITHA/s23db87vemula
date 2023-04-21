var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var mongodb = require('mongodb')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var gadget = require("./models/gadget");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username }, function (err, user) {
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  });
  }))

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{
  useNewUrlParser: true,
   useUnifiedTopology: true
});

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
var resourceRouter =  require("./routes/resource");
const gadget = require('./models/gadget');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gadget', gadgetsRouter);
app.use('/board', boardsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);


// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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

// We can seed the collection if needed on server start
async function recreateDB(){
 // Delete everything
 await gadget.deleteMany();
 
 let instance1 = new
 gadget({
   gadget_type:"Laptop",
   gadget_price :2000.00,
   gadget_version:"Samsung S95B OLED"
 });
instance1.save().then(()=>{
  console.log("First object saved")
}).catch((err)=>{
  console.log(err);
})

let instance2 = new
 gadget({
   gadget_type:"Phone",gadget_price :5000.00,gadget_version:"Apple 13 pro" 
 });
instance2.save().then(()=>{
  console.log("Second object saved")
}).catch((err)=>{
  console.log(err);
});

let instance3 = new
 gadget({
   gadget_type:"Tablet",gadget_price :7000,gadget_version:"iPAD 12"
 });
 instance3.save().then(()=>{
  console.log("Third object saved")
}).catch((err)=>{
  console.log(err);
});
}
let reseed = false;
if (reseed) { recreateDB();}



module.exports = app;
