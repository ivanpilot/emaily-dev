const keys = require('./config/keys');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //this is b/c express doen't know anything about cookie so we want to create and access cookies
const passport = require('passport'); // this is b/c passport do plenty of things aournd serialize and deserialize and attaching cookies to req object of http request. we want passport to include and use a cookie when sending data back to client
require('./models/User');
require('./services/passport'); //the order here is important! inside passport we require the use of Users model so we need in the index.js file to require Users before passport

const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
    cookieSession({
      maxAge: 30*24*60*60*1000, // duration life of a cookie in ms by default
      keys: [keys.cookieKey] // arbitrary key to encrypt the cookies
    })
)
app.use(passport.initialize()); // tell passport to initialize and use the cookies
app.use(passport.session()); // tell passport to initialize and use the cookies


app.get('/', (req, res) => {
    res.send({google: 'you are in!!'})
})

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});
