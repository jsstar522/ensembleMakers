const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('../models/user');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.find({
        oauth2: profile.id,
        provider: 'google'
      });
      if (exUser) {
        done(null, exUser);
      } else {
        await new User({
          email: profile.emails[0].value,
          firstName: profile.displayName,
          oauth2: profile.id,
          provider: 'google'
        })
        .save()
        .then(newUser => done(null, newUser))
        .catch(error => {
          console.error(error.message);
          done(error)
        });
      }
    } catch (error) {
      console.error(error.message);
      done(error);
    }
  }));
};