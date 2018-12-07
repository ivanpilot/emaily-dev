const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google',
        passport.authenticate(
            'google',
            { scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ] }
        )
    );

    app.get('/auth/google/callback',
        passport.authenticate(
            'google',
            { failureRedirect: '/login' }
        ),
        function(req, res) {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout(); // this is provided by passport. It kills the cookie.
        // res.send(req.user) // this is an otpional line of code which create a blank web page since req.user is null. just to make sure that the cookies has been deleted by passport
        res.redirect('/');
      })

    app.get('/api/current_user', (req, res) => {
        console.log('req user is: ', req.user) // we have a user prop on the req object because of passport.deserialize() function
        res.send(req.user)
    })
}
