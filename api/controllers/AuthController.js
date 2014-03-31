/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');

module.exports = {
	index: function (req, res) {
        res.view();
    },

    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },

    // https://developers.facebook.com/docs/
    // https://developers.facebook.com/docs/reference/login/
    facebook: function (req, res) {
        passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email', 'user_friends'] },
            function (err, user) {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log(err);
                        res.view('500');
                        return;
                    }

                    console.log('controller output for user: ');
                    console.log(user);

                    res.redirect('/');
                    return;
                });
            })(req, res);
    },
};
