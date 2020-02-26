// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

/*passport.use(new BasicStrategy(
    function(username, password, done) {
        //hard coded
        //var user = { name: "testuser" };
        var user = db.findOne(req.body.username)
        //if (username == user.name && password == "cu")
        if(req.body.password == user.password)
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
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
exports.isAuthenticated = passport.authenticate('basic', { session : false });