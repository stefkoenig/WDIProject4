var 
	mongoose     = require('mongoose'),
	Schema       = mongoose.Schema

//destination schema
var destinationSchema = new Schema({	
	name: String,
	specificLocation: {
		lat: Number,
		lng: Number
	},
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

var Destination = mongoose.model('Destination', DestinationSchema)

module.exports = Destination
