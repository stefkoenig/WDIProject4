var 
	mongoose     = require('mongoose'),
 	Schema       = mongoose.Schema,
	bcrypt 		 = require('bcrypt-nodejs')

//user schema
var userSchema   = new Schema({
	username: { type: String, required: true, index: { unique: true }},
	email: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	age: Number,
	bio: String,
	resident: Boolean,
	timeInCa: Number,
	location: String
});

//save and hash the password 
userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

userSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', userSchema);