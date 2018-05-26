require('./config/config');
require('./config/mongoose');

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { passport } = require('./config/passport');
const Router = require('./app/routes/lovenotes')(passport);
const flash = require('connect-flash');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('dev')); // logs every request to the console
app.use(cookieParser()); // reads cookies (needed for auth)

app.set('view engine', 'ejs');

// Required for passport

app.use(session({ secret: 'ilovemyhair' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // Use connect-flash for flash messages stored in session

app.use('/', Router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke' });
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server up and listening on ${process.env.PORT}`);
});

module.exports = { app };