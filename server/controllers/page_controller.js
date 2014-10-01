//Page Controller
var Page = require('./../models/page_model.js');
var page = {}

page.query = function (req, res) {
	var limit 	= req.query.limit || 10;
	var skip	= req.query.skip || 0;

	delete req.query.limit;
	delete req.query.skip;

	Page.find(req.query, {}, { skip : skip, limit : limit }, function (err, pages) {
		if(pages) {
			res.json(pages);
		} else {
			res.json([]);
		}
	});
};

page.get = function (req, res) {
	Page.findOne({ _id : req.params.id }, function(err, page) {
		res.json(page);
	});
};

page.save = function (req, res) {
	var page = new Page(req.body);

	if(req.body._id) {
		Page.where({ _id : req.body._id }).update(req.body);
	} else {
		page.save(function(err, savedPage, affected) {
			console.log(err);
			if(!err) {
				res.json(savedPage);
			} else {
				res.status(500).end('User could not be saved');
			}
		});
	}
};

page.remove = function(req, res) {

};

page.delete = function (req, res) {

};

module.exports = page;