'use strict';

//  node modules
const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose       = require('mongoose');

//  local modules
const keys           = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);            //  NOTE: user.id = mongoDB _id
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ provider: profile.provider, providerID: profile.id })
            .then((existingUser) => {
                if ( existingUser ) {
                    //  user exists -- do not write
                    done(null, existingUser);
                } else {
                    new User({ provider: profile.provider, providerID: profile.id, displayName: profile.displayName }).save()
                        .then(user => done(null, user));
                }
            })
    })
)
