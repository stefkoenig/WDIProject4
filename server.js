var
  express    = require('express'),
  app        = express(),
  logger     = require('morgan'),
  path       = require('path'),
  mongoose   = require('mongoose'),
  bodyParser = require('body-parser'),
  apiRoutes  = require('.routes/api.js'),
  database   = 'mongodb://localhost/catravelapp',
// database = 'mongodb://test:test@ds027295.mongolab.com:27295/catravelapp'
  port       = process.env.PORT || 3000

//  apiRoutes  = require()
apiRouter.get('/', function(req,res){
	res.json({message: "Api routes are working."})
})

//establishes connection to MongoDB
mongoose.connect(database, function(err){
  if(err) throw err
 console.log('Successfully connected to database:', database)
});

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(express.static(path.join(_dirname, '/public')))

//setting the root route
app.get('/', function(req,res){
  console.log('getting index?')
  res.send('index')
})

//setting the api routes
app.use('/api/v1', apiRoutes)

//Server listening on port 3000
app.listen(port, function(){
  console.log('Server listening on port', port)
})
