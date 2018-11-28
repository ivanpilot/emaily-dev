const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => { // this function will make passport stash this into a cookie that will be transmitted to the client browser
  done(null, user.id)
})

passport.deserializeUser((userId, done) => { // this function will automatically add the user model instance retrieved from the db to the http request
    User.findById(userId)
      .then((user) => {
          done(null, user)
      })
})


passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true //since we are hosting the prod version on heroku, internally googlestrategy sees heroku as a proxy and do not trust proxies so it switch from https to http. setting the proxy file to true prevent the switch
    },
    async function(accessToken, refreshToken, profile, done) {
        const existingUser = await User.findOne({ googleId: profile.id});

        if(existingUser) {
          return done(null, existingUser);
        }

        const user = await new User({ googleId: profile.id}).save();
        done(null, user);
    }
    // function(accessToken, refreshToken, profile, done) {
    //     User.findOne({ googleId: profile.id})
    //         .then((user) => {
    //             if(!user) {
    //                 new User({ googleId: profile.id})
    //                     .save()
    //                     .then((user) => done(null, user))
    //             }
    //             done(null, user)
    //         })
    // }
));
