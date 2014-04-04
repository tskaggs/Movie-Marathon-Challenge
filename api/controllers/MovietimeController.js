/**
 * MovietimeController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */


 module.exports = {

	create: function (req, res, next) {

	  	Movietime.create( req.params.all(), function movietimeCreated (err, movietime) {
	  		
	  		if (err) return next(err);

	  		res.redirect('/');
	  	});
  	},

 };