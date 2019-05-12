/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
	// Get all washrooms
	app.get("/api/washrooms", function(req, res) {
		db.Washroom.findAll({}).then(function(dbwashrooms) {
			res.json(dbwashrooms);
		});
	});

	// Create a new washroom
	app.post("/api/washrooms", function(req, res) {

		const data = req.body;
		data.overallRating = parseInt(data.overallRating);
		
		console.log(data);
		
		db.Washroom.create(data).then(function(dbwashroom) {
			res.json(dbwashroom);
		});
	});

	// Delete an washroom by id
	app.delete("/api/washrooms/:id", function(req, res) {
		db.Washroom.destroy({ where: { id: req.params.id } })
			.then(function(dbwashroom) {
				res.json(dbwashroom);
			});
	});
};
