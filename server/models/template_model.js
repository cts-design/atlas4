var mongoose = require('mongoose');

module.exports = mongoose.model('Template', {
	name : String,
	html : String,
	created : { type : Date, default : Date.now() },
	modified : { type : Date, default : Date.now() },
	last_user_edit : Number
});