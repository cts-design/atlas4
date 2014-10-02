var User 	= require('./../../server/models/user_model.js');
var jwt 	= require('jsonwebtoken');
var config	= require('./../../config.json');
var user 	= {};

user.login = function(req, res, next) {
	var token = jwt.sign({
		username : 'root'
	}, config.secret);

	res.json({ token : token });
};

user.get = function(req, res) {
	User.findById(req.params.id)
	.sort('-username')
	.exec(function(err, user) {
		res.json(user);
	});
};

user.query = function(req, res) {
	var limit 	= req.query.limit || 10;
	var skip	= req.query.skip || 0;

	delete req.query.limit;
	delete req.query.skip;

	User.find(req.query)
	.select('-password')
	.skip(skip)
	.limit(limit)
	.exec(function (err, users) {
		if(users) {
			res.json(users);
		} else {
			res.json([]);
		}
	})
};

user.delete = function(req, res) {
	var id = req.params.id;
	
	User.findByIdAndRemove(id, function(err, removedUser){
		res.json(removedUser);
	});
}

user.save = function(req, res) {
	var user = new User(req.body);

	var id = req.body._id || 0;
	delete req.body._id;
	delete req.body.__v;

	if(id) {
		User.findByIdAndUpdate(id, req.body, {}, function(err, users) {
			res.json(users);
		});
	} else {
		user.save(function(err, savedUser, affected) {
			if(!err) {
				res.json(savedUser);
			} else {
				res.status(500).end('User could not be saved');
			}
		});
	}
};

user.remove = function(req, res) {
	res.send({ output : 'User has been removed' });
};

module.exports = user;