require('dotenv/config'); //we do not assign it to a variable because we just want to reference that file somewhere in our code so it is executed but we are not using any returned value from this file. This is why we just condense it to 'require...'
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('________________')
        console.log('ACESS TOKEN IS')
        console.log(accessToken)
        console.log('________________')
        console.log('REFRESH TOKEN IS')
        console.log(refreshToken)
        console.log('________________')
        console.log('PROFILE IS')
        console.log(profile)
        console.log('________________')
        //User.findOrCreate({ googleId: profile.id }, function(err, user) {
        //    return done(err, user)
        //});
    }
));
