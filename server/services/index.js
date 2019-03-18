const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const google = require('./googleStrategy');
const { User } = require('../models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  
  passport.deserializeUser((email, done) => {
    User.findOne({ email: email })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  local(passport);
  kakao(passport);
  google(passport);
};