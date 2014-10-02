var Page 	= require('./../../server/models/page_model.js');
var jwt 	= require('jsonwebtoken');
var config	= require('./../../config.json');
var page 	= {};

page.get = function(req, res) {
	Page.findById(req.params.id)
	.exec(function(err, page) {
		res.json(page);
	});
};

page.query = function(req, res) {
	var limit 	= req.query.limit || 10;
	var skip	= req.query.skip || 0;

	delete req.query.limit;
	delete req.query.skip;

	Page.find(req.query)
	.skip(skip)
	.limit(limit)
	.exec(function (err, pages) {
		if(pages) {
			res.json(pages);
		} else {
			res.json([]);
		}
	})
};

page.delete = function(req, res) {
	var id = req.params.id;
	
	Page.findByIdAndRemove(id, function(err, removedPage){
		res.json(removedPage);
	});
}

page.save = function(req, res) {
	var page = new Page(req.body);

	var id = req.body._id || 0;
	delete req.body._id;
	delete req.body.__v;

	if(id) {
		Page.findByIdAndUpdate(id, req.body, {}, function(err, pages) {
			res.json(pages);
		});
	} else {
		Page.save(function(err, savedPage, affected) {
			if(!err) {
				res.json(savedPage);
			} else {
				res.status(500).end('Page could not be saved');
			}
		});
	}
};

module.exports = page;