var
	mongoose     = require('mongoose'),
	Schema       = mongoose.Schema

//destination schema
var destinationSchema = new Schema({
	name: String,
	// location: {type: [Number]},
	address: String,
	created_at: Date,
	comments: [{type: String}],
	pictures: [{type: String}]
})

destinationSchema.pre('save', function(next){
  if(!this.created_at){
    var currentDate = new Date();
    this.created_at = currentDate;
  }
  next();
});

var Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination
