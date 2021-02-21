const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

passport.use(new GoogleStrategy({
    clientID: "198105665708-0qukg43q0r1iifd093clpmlt9abcnrs5.apps.googleusercontent.com",
    clientSecret: "_7V6XlNTF24BuCdAB3O-QZF8",
    callbackURL: "http://localhost:3000/google/callback" //pois vai rodar em localhost
  },
  
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));