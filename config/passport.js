const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

const LocalStrategyConfig = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-login', new LocalStrategy(LocalStrategyConfig,
  async (req, email, password, done) => {
    const user = await User.findOne({ 'local.email': email }).catch(done);

    if (!user) { return done(null, false, req.flash('loginMessage', 'Email not found')); }
    if (!user.validatePassword(password)) { return done(null, false, req.flash('loginMessage', 'Incorrect password')); }
    // Verify Callback - Success
    return done(null, user);
  }));

passport.use('local-signup', new LocalStrategy(LocalStrategyConfig,
  async (req, email, password, done) => {
    const user = await User.findOne({ 'local.email': email }).catch(done);
    if (user) { return done(null, false, req.flash('signupMessage', 'Email is already taken')); }

    const newUser = new User({
      'local.email': email,
      'local.password': password,
    });

    await newUser.save().catch(done);
    // Verify Callback - Success
    return done(null, newUser);
  }));

module.exports = { passport };