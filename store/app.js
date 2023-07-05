var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');

const session = require('express-session');
const authUtils = require("./util/authUtils");

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/loginRoute');
const productRouter = require('./routes/productRoute');
const productPurchaseRouter = require('./routes/productPurchaseRoute')
const purchaseRouter = require('./routes/purchaseRoute');
const prodApiRouter = require('./routes/api/ProductApiRouter');
const prodPurchApiRouter = require('./routes/api/ProductPurchaseApiRouter');
const purchApiRouter = require('./routes/api/ProductApiRouter');
const sequelizeInit = require('./config/sequelize/init')
sequelizeInit().catch(err => {
  console.log(err);
})
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('secret'));

i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'acme-hr-lang',
});

app.use(i18n.init);

app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});



app.use(session({
  secret: 'my_secret_password',
  resave: false
}));
app.use((req, res, next) => {
  res.locals.loggedUser = req.session.loggedUser;

  if (!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/products', authUtils.permitAuthenticatedUser, productRouter);
app.use('/productPurchases', authUtils.permitAuthenticatedUser, productPurchaseRouter);
app.use('/purchases', authUtils.permitAuthenticatedUser, purchaseRouter);
app.use('/api/products', authUtils.permitAuthenticatedUser, prodApiRouter);
app.use('/api/productPurchases', authUtils.permitAuthenticatedUser, prodPurchApiRouter);
app.use('/api/purchases', authUtils.permitAuthenticatedUser, purchApiRouter);



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
