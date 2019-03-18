const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models/user');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.find({
        oauth2: profile.id,
        provider: 'kakao'
      });
      if (exUser) {
        done(null, exUser);
      } else {
        await new User({
          email: profile._json && profile._json.kaccount_email,
          firstName: profile.displayName,
          oauth2: profile.id,
          provider: 'kakao'
        })
        .save()
        .then(newUser => done(null, newUser))
        .catch(error => {
          console.error(error.message);
          done(error)
        });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};