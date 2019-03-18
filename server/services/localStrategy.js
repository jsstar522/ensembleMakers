const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models/user');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    // console.log(email);
    // console.log(password);
    try {
      const exUser = await User.find({ email: email });
      // console.log(exUser[0]);
      if (exUser) {
        // console.log(password, exUser[0].password);
        const result = await bcrypt.compare(password, exUser[0].password);
        // console.log(`result is shown : ${result}`);
        if (result) {
          done(null, exUser[0]);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
        }
      } else {
        done(null, false, {message: '가입되지 않은 회원입니다.'});
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};