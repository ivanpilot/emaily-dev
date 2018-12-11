const keys = require('./config/keys');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); //this is b/c express doen't know anything about cookie so we want to create and access cookies
const passport = require('passport'); // this is b/c passport do plenty of things aournd serialize and deserialize and attaching cookies to req object of http request. we want passport to include and use a cookie when sending data back to client
require('./models/User');
require('./models/Survey');
require('./services/passport'); //the order here is important! inside passport we require the use of Users model so we need in the index.js file to require Users before passport

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json())

app.use(
    cookieSession({
      maxAge: 30*24*60*60*1000, // duration life of a cookie in ms by default
      keys: [keys.cookieKey] // arbitrary key to encrypt the cookies
    })
)
app.use(passport.initialize()); // tell passport to initialize and use the cookies
app.use(passport.session()); // tell passport to initialize and use the cookies

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

// so apparently when we are in production, it is a bit more tricky than in dev, we will to tell express which file and from where to serve them. typically, they are some routes which are supposed to be managed by express and other by react and this is what might create the confusion so it is recommended to tell express what to serve. I THINK IT IS WEIRD and it is ONLY DUE to the fact that we have embedded REACT INSIDE our SERVER code which explain why express has to know everything i.e. a user wants to go to a url, it goes straight to express and then express need to figure out if it serves the resource and which one or if it delegates to react. HAD we SEPARATED the front end from the back end, a user will always hit REACT. and React decides what to do next.
//
// In our current config of front-end / back-end, let's see how to tell express what to serve.
if(process.env.NODE_ENV === 'production'){
    //Express will serve up production assets
    //like our main.js file or main.css file
    app.use(express.static('client/build')); // this line says that if any routes arrives here and we do not understand what it is looking for, go look inside the static directory, under client under build to see if some files matches the request. if there is serve this file

    //Express will serve up the index.html file
    //if it doesn't recognise the route
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }) // this line says if the request reaches up to here it means we couldn't figure out what is required so just serve the index.html file and that is it!!
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});
