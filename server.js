var
  express    = require('express'),
  app        = express(),
  logger     = require('morgan'),
  path       = require('path'),
  mongoose   = require('mongoose'),
  bodyParser = require('body-parser'),
  apiRoutes  = require('.routes/api.js')
//  apiRoutes  = require()

//Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/catravelapp', function(err){
  if(err) throw err
  console.log('Connected to MonboDB')
})

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
app.listen(3000, function(){
  console.log('Server listening on port 3000!')
})
