/**
 * HomeController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var request = require('request');
var passport = require('passport');

module.exports = {
	index: function (req,res)
    {

        console.log(req.user);


        res.view({
            user: req.user
        });
    },
};
