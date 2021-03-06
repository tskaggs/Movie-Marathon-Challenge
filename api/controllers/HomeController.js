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
        async.series({
		    one: function(callback){
		    	request.get('https://graph.facebook.com/me/friends?access_token='+ req.user.token, function(req, res, body){
					callback(null, JSON.parse(body));
				});
		    },
		    two: function(callback){
        		callback(null, req.user);
		    },
		    three: function(callback) {
                Movietime.find()
                	.where({owner: req.user.id})
                 	.exec(function (err, response) {
				        callback(null, response);
				    });
            }
		},
		function(err, results) {
			res.view({
	            user: results
	        });
		});
    },

    rottensearch:function (req,res) {
	    var movie = req.param("movie");

	    request.get('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=h3xeebvv285sm9b4njetkp53&q='+ movie, function(err, resp, body){
			var param = JSON.parse(body);
			res.json(param);

		});
	},

	create: function (req, res, next) {

	  	Movietime.create( req.params.all(), function movietimeCreated (err, movietime) {
	  		
	  		if (err) return next(err);

	  		res.redirect('/');
	  	});
  	},
};
