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

console.log(passport);
console.log(BasicStrategy);

passport.use(new BasicStrategy(
    function(username, password, done) {
        var user = db.findOne(username)

        if (user)
        {
            done(null,false);
        }
        else{
            if (password == user.password) {
                done(null, user)
            }
        }
        /*
        var user = db.findOne(req.body.username);

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        }
        else {
            // check if password matches
            if (req.body.password == user.password)  {
                var userToken = { id : user.id, username: user.username };
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json({success: true, token: 'JWT ' + token});
            }
            else {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        };*/
        /*
        db.findOne({username: req.body.username}, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });*/
    }
));
exports.isAuthenticated = passport.authenticate('basic', { session : false });