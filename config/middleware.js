var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;


var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {

        User.findOne({
                or: [
                    {uid: parseInt(profile.id)},
                    {uid: profile.id}
                ]
            }
        ).done(function (err, user) {
                if (user) {
                    console.log("1 user data show: ");
                    console.log(profile);
                    return done(null, user);
                } else {
                    console.log("2 user data show: ");
                    console.log(profile);

                    var data = {
                        provider: profile.provider,
                        uid: profile.id,
                        name: profile.displayName
                    };

                    if(profile.emails && profile.emails[0] && profile.emails[0].value) {
                        data.email = profile.emails[0].value;
                    }
                    if(profile.name && profile.name.givenName) {
                        data.fistname = profile.name.givenName;
                    }
                    if(profile.name && profile.name.familyName) {
                        data.lastname = profile.name.familyName;
                    }

                    User.create(data).done(function (err, user) {
                            return done(err, user);
                        });
                }
            });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}).done(function (err, user) {
        done(err, user)
    });
});


module.exports = {

    // Init custom express middleware
    // I know that making the Secret is bad but this isn't a production app 
    // so... yea sorry about this. :P
    express: {
        customMiddleware: function (app) {

            passport.use(new FacebookStrategy({
                    clientID: "1423059927944450",
                    clientSecret: "237f134c68ddb0a5ab007acf8ac0702e",
                    callbackURL: "http://localhost:1337/auth/facebook/callback"
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};
