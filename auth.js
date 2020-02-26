// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

/*passport.use(new BasicStrategy(
    function(username, password, done) {
        //hard coded
        var user = { name: "testuser" };
        if (username == user.name && password == "cu")
        {
            return done(null, user);
        }
        else
        {
            return done(null, false);
        }
    }
));*/

passport.use(new BasicStrategy(
    function(username, password, done) {
        db.findOne({username: req.body.username}, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
exports.isAuthenticated = passport.authenticate('basic', { session : false });