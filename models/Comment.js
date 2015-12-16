var
	mongoose     = require('mongoose'),
	Schema       = mongoose.Schema

//destination schema
var commentSchema = new Schema({
	text: String,
	created_at: Date
})

commentSchema.pre('save', function(next){
  if(!this.created_at){
    var currentDate = new Date();
    this.created_at = currentDate;
  }
  next();
});

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
