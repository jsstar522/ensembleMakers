const express = require('express');
const passport = require('passport');

const { hashPassword } = require('../lib/hashPassword');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models/user');

const router = express.Router();

// signup
router.post('/register', isNotLoggedIn, async (req, res, next) => {
  
  const {email, password} = req.body;
  try {
    const exUser = await User.find({ email: email });
    if (exUser[0]) {
      req.flash('registerError', '이미 가입된 이메일입니다.');
      // return res.redirect('/register');
      return res.status(404).json('registerError');
    }
    const rebody = {};
    rebody['password'] = await hashPassword(password);
    Object.keys(req.body).map(async (key) => {
      if (key === 'password') return;
      else return rebody[key] = req.body[key];
    });
    // console.log(rebody);
    let user = new User(rebody);
    user = await user.save();
  
    return res.json(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// signin
router.post('/login', isNotLoggedIn, (req, res, next) => {
  const {email, password} = req.body;
  // passport
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.status(404).json(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.json(user);

    });
  })(req, res, next);
});

// logout
router.get('/logout', isLoggedIn, (req, res) => {
  console.log('----------------logout')
  req.logout();
  req.session.destroy();
  res.redirect('/');
})

// check passport
router.get('/check', isLoggedIn, (req, res) => {
  res.send(req.isAuthenticated())
})

router.get('/kakao', passport.authenticate('kakao'));
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/');
});
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;