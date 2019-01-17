'ues strict';

//  node modules
const express       = require('express');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');
const path          = require('path');

//  local modules
require('./models/User');
require('./services/passport');         //  NOTE: this convention means we require nothing from the module, only that the module be loaded
const keys          = require('./config/keys');

mongoose.connect(keys.mongoURI,{useNewUrlParser: true });

const app     = express();              //  NOTE: to self this is an instance of an express application - named 'app'

//  middelware -- pre-processing before going to routes
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,       //  30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);