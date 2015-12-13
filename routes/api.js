var
  express = require('express'),
  apiRouter = express.Router(),
  mongoose = require('mongoose'),
  User = require('..models/User.js'),
  Destination = require('..models/Destination.js'),
  jwt = require('jsonwebtoken'),
  superSecret = 'viaggiare'

  apiRouter.get('/', function(req,res){
    res.json({message: 'API routes are working.'})
  })
