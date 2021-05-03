const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/profilesModel.js');
const bcrypt = require('bcrypt');

exports.init = function() {
    passport.use(new Strategy(function(username, password, cb) {
        userModel.lookup(username, function(err, user) {
            console.log('Active user: ', username);
            if (err) {
                console.log('Error: Unknown User', err);
                return cb(err);
            }
            if (!user) {
                console.log('user ', username, ' Error: User not found');
                return cb(null, false);
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result) {
                    cb(null, user);
                } else {
                    cb(null, false);
                }
            });
        });
    }));

    passport.serializeUser(function(user, cb) {
        cb(null, user.user);
    });

    passport.deserializeUser(function(id, cb) {
        userModel.lookup(id, function(err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });
}

exports.userize = function(redirect) {
    return passport.authenticate('local', { failureRedirect: redirect });
};