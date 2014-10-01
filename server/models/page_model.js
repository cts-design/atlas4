var mongoose = require('mongoose');
module.exports = mongoose.model('Page', {
	name : String,
	body : String,
	creator_user_id : Number,
	modifier_user_id : Number,
	created : { type : Date, default : Date.now() },
	modified : {}
});