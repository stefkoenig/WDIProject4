var
  express    = require('express'),
  dotenv     = require('dotenv').load(),
  app        = express(),
  logger     = require('morgan'),
  path       = require('path'),
  mongoose   = require('mongoose'),
  ejs        = require('ejs'),
  bodyParser = require('body-parser'),
  apiRouter  = require('./routes/api.js'),
  // database   = 'mongodb://localhost/catravelapp',
  database = 'mongodb://test:test@ds027295.mongolab.com:27295/catravelapp'
  port       = process.env.PORT || 3000,
  // flash      = require('connect-flash'),
  http       = require('http')

//establishes connection to MongoDB
mongoose.connect(database, function(err){
  if(err) throw err
 console.log('Successfully connected to database:', database)
});

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '/public')))

//setting the root route
app.get('/', function(req,res){
  console.log('getting index?')
  // res.render('index')
  res.sendFile(__dirname + '/public/index.html')
})


//setting the api routes
app.use('/api/v1', apiRouter)

//Server listening on port
app.listen(port, function(){
  console.log('Server listening on port', port)
  console.log(process.env.SECRET_KEY)
})
