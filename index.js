const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');
require('dotenv/config');
const authRoutes = require('./routes/authRoutes');

mongoose.connect(MONGO_URI);

const app = express();


app.get('/', (req, res) => {
    res.send({google: 'you are in!!'})
})

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});
