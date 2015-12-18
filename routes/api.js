var
  express = require('express'),
  apiRouter = express.Router(),
  mongoose = require('mongoose'),
  User = require('../models/User.js'),
  Dest = require('../models/Destination.js'),
  Comment =require('../models/Comment.js'),
  jwt = require('jsonwebtoken'),
  superSecret = 'viaggiare'

  apiRouter.get('/', function(req,res){
    res.json({message: 'API routes are working.'})
  })

  apiRouter.route('/destinations')
	.get(function(req,res){
		Dest.find({}, function(err, dest){
			res.json(dest)
		})
	})
	.post(function(req,res){
		var newDest = new Dest
	//	var newDest = {}
		newDest.name = req.body.name
    newDest.address = req.body.address
		// newDest.location = req.body.location
    newDest.comments = req.body.comments
		newDest.save(function(err, dest){
			if(err) throw err
			res.json({message: "Destination Saved!", dest: dest})
		})
	})

apiRouter.route('/destinations/:id')
	.get(function(req,res){
		Dest.findById(req.params.id, function(err,dest){
			if(err) throw err
			res.json(dest)
		})
	})
	.patch(function(req,res){
		Dest.findOneAndUpdate({_id: req.params.id}, req.body, function(err,dest){
      // dest.comments.push(req.params.commentId)
      dest.save(function(err){
        if(err) throw err
        res.json(dest)
      })
			if(err) throw err
			Dest.findById(req.params.id, function(err,updatedDest){
				res.json(updatedDest)
			})
		})
	})
	.delete(function(req,res){
		Dest.findOneAndRemove({_id: req.params.id}, req.body, function(err,dest){
			if(err) throw err
			res.json({message:"destination deleted!"})
		})
	})

apiRouter.get('/destroy-all', function(req,res){
	Dest.remove({}, function(err){
		if(err) throw err
		res.json({message: 'All destinations destroyed! Booooom!'})
	})
})

  // -----------------------------------api routes for a user -------------------------------------------------------------------------
  // route to generate sample user
  apiRouter.post('/sample', function(req, res) {

  	// look for the user named test
  	User.findOne({ 'username': 'test' }, function(err, user) {

  		// if there is no test user, create one
  		if (!user) {
  			var sampleUser = new User()

  			sampleUser.name = 'test'
  			sampleUser.username = 'test'
  			sampleUser.password = 'test'
        sampleUser.email = 'test@gmail.com'

  			sampleUser.save()
  		} else {
  			console.log(user)

  			// if there is a test user, update the password
  			user.password = 'test'
  			user.save()
  		}
  		res.json({ user: user})
  	})

  })



  //will hit route in angular
  apiRouter.get('/addDest/:destId/u/:username', function(req,res){
    console.log(req)
  	User.findOne({username: req.params.username}, function(err, user){
  		user.destinations.push(req.params.destId)
  		user.save(function(err){
  			if(err) throw err
  			res.json(user)
  		})
  	})
  })




  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  apiRouter.post('/authenticate', function(req, res) {

  	// find the user
  	User.findOne({
  		username: req.body.username
  	}).select('username password email').exec(function(err, user) {

  		if (err) throw err;

  		// no user with that username was found
  		if (!user) {
  			res.json({
  				success: false,
  				message: 'Authentication failed. User not found.'
  			});
  		} else if (user) {

  			// check if password matches
  			var validPassword = user.comparePassword(req.body.password);
  			if (!validPassword) {
  				res.json({
  					success: false,
  					message: 'Authentication failed. Wrong password.'
  				});
  			} else {

  				// if user is found and password is right
  				// create a token
  				var token = jwt.sign({
  					name: user.name,
  					username: user.username
  				}, superSecret, {
  					expiresInMinutes: 1440 // expires in 24 hours
  				});

  				// return the information including token as JSON
  				res.json({
  					success: true,
  					message: 'Enjoy your token!',
  					token: token
  				});
  			}

  		}

  	});
  });

  // on routes that end in /users
  // ----------------------------------------------------
  apiRouter.route('/users')

    // create a user (accessed at POST http://localhost:8080/users)
    .post(function(req, res) {

      var user = new User()		// create a new instance of the User model
      user.email = req.body.email  // set the users name (comes from the request)
      user.username = req.body.username  // set the users username (comes from the request)
      user.password = req.body.password  // set the users password (comes from the request)
      user.age = req.body.age
      user.bio = req.body.bio
      user.resident = req.body.resident
      user.timeInCa = req.body.timeInCa
      user.location = req.body.location

      user.save(function(err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false, message: 'A user with that username already exists. '});
          else
            return res.send(err);
        }

        // return a message
        res.json({ message: 'User created!' });
      });

    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {

      User.find({}, function(err, users) {
        if (err) res.send(err);

        // return the users
        res.json(users);
      });
    });

  // route middleware to verify a token
  apiRouter.use(function(req, res, next) {
  	// do logging
  	console.log('Somebody just came to our app!');

  	// check header or url parameters or post parameters for token
  	var token = req.body.token || req.query.token || req.headers['x-access-token'];

  	// decode token
  	if (token) {

  		// verifies secret and checks exp
  		jwt.verify(token, superSecret, function(err, decoded) {

  			if (err) {
  				res.status(403).send({
  					success: false,
  					message: 'Failed to authenticate token.'
  			});
  			} else {
  				// if everything is good, save to request for use in other routes
  				req.decoded = decoded;

  				next(); // make sure we go to the next routes and don't stop here
  			}
  		});

  	} else {

  		// if there is no token
  		// return an HTTP response of 403 (access forbidden) and an error message
  		res.status(403).send({
  			success: false,
  			message: 'No token provided.'
  		});

  	}
  });

  // test route to make sure everything is working
  // accessed at GET http://localhost:8080/api
  apiRouter.get('/', function(req, res) {
  	res.json({ message: 'hooray! welcome to our api!' });
  });



  // on routes that end in /users/:username
  // ----------------------------------------------------
  apiRouter.route('/users/:username')

  	// get the user with that id
  	// .get(function(req, res) {
  	// 	User.findById(req.params.user_id, function(err, user) {
  	// 		if (err) res.send(err);
    //
  	// 		// return that user
  	// 		res.json(user);
  	// 	});
  	// })
    .get(function(req, res) {
  		User.findOne({username: req.params.username})
      .populate('destinations')
      .exec( function(err, user) {
  			if (err) res.send(err);

  			// return that user
  			res.json(user);
  		});
  	})

  	// update the user with this username
  	.put(function(req, res) {
  		User.findOne({username: req.params.username}, function(err, user) {

  			if (err) res.send(err);

  			// set the new user information if it exists in the request
  			if (req.body.email) user.email = req.body.email;
  			if (req.body.username) user.username = req.body.username;
  			if (req.body.password) user.password = req.body.password;
  			if (req.body.age) user.age = req.body.age;
  			if (req.body.bio) user.bio = req.body.bio;
  			if (req.body.resident) user.resident = req.body.resident;
  			if (req.body.timeInCa) user.timeInCa = req.body.timeInCa;
  			if (req.body.location) user.location = req.body.location;

  			// save the user
  			user.save(function(err) {
  				if (err) res.send(err);

  				// return a message
  				res.json({ message: 'User updated!' });
  			});

  		});
  	})

  	// delete the user with this username
  	.delete(function(req, res) {
  		User.remove({
  			username: req.params.username
  		}, function(err, user) {
  			if (err) res.send(err);

  			res.json({ message: 'Successfully deleted' });
  		});
  	});

  // api endpoint to get user information
  apiRouter.get('/me', function(req, res) {
  	res.send(req.decoded);
  });

module.exports = apiRouter
