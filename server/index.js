const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
const passportConfig = require('./services');
const autoIncrement = require('mongoose-auto-increment');

const express = require('express');
const app = express();

/**
 * DB Connect
 */
mongoose
  .connect(
    "mongodb://localhost/traverse_dev",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error(error.message));

// autoIncrement 초기화
autoIncrement.initialize(mongoose.connection);

/**  
 * Routes
 */
// const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const portionsRouter = require('./routes/portions');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');
const customerRouter = require('./routes/customer');
const orderRouter = require('./routes/order');

/**
 * Middleware
 */
passportConfig(passport);
app.use(helmet());
app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 로그인 세션
// app.use(session({
//   resave: false,
//   saveUninitialized: true,
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//     maxAge: (60 * 60 * 1000)
//   },
// }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/auth', authRouter);
// app.use('/api/users', usersRouter);
app.use('/api/portions', portionsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/customer', customerRouter);
app.use('/api/order', orderRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

if (app.get('env') === 'production') {
  // Express 가 production 어셋들을 제공한다. (main.js, main.css ...)
  app.use(express.static('client/build'));
  
  // Express 가 라우트를 구분하지 못하면 index.html 을 제공한다.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
