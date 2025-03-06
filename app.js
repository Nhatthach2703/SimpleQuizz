// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var mongoose = require('mongoose');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var quizRouter = require('./routes/quizRoutes');
// var questionRouter = require('./routes/questionRoutes');
// var usersRouter2 = require('./routes/userRoutes');
// const quizHistoryRoutes = require('./routes/quizHistoryRoutes');


// var app = express();

// const url = 'mongodb://127.0.0.1:27017/Assignment1'
// const connect = mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("MongoDB connected success"))
// .catch(err => console.error("MongoDB connection error:", err));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'jade');
// app.set('view engine', 'ejs'); 
// // app.set('view engine', 'hbs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/quizzes', quizRouter);
// app.use('/question', questionRouter);
// // app.use('/user', usersRouter2);
// // app.use('/doQuiz', quizHistoryRoutes);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;




var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quizRouter = require('./routes/quizRoutes');
var questionRouter = require('./routes/questionRoutes');

var app = express();
require('dotenv').config(); 

// Kết nối MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Cấu hình view engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));  // Hỗ trợ PUT & DELETE từ form
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quizzes', quizRouter);
app.use('/questions', questionRouter);

// Xử lý lỗi 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Xử lý lỗi chung
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
