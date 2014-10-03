var Template = require('./../models/template_model.js');

module.exports = function(route) {

	/* Query */
	route.get('/template', function(req, res) {
		Template.find(req.query).sort('created').exec(function(err, templates) {
			res.json(templates);
		});
	})

	route.get('/template/:id', function(req, res) {
		Template.findById(req.params.id).sort('created').exec(function(err, template) {
			res.json(template);
		});
	})

	// save
	route.post('/template', function(req, req) {
		var template = new Template(req.body);

		template.save(function(err, savedTemplate) {
			res.json(savedTemplate);
		});
	});

	//update
	route.put('/template/:id', function(req, res) {
		Template.findByIdAndUpdate(req.body.id, req.body, {}, function(err, savedTemplate) {
			res.json(savedTemplate);
		});
	});

	// delete
	route.delete('/template/:id', function(req, res) {

	});

}