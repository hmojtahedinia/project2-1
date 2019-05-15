require("dotenv").config();
const db = require("../models");

const axios = require("axios");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

module.exports = function(app) {
	// Get all washrooms
	app.get("/api/washrooms", function(req, res) {
		db.Washroom.findAll({}).then(function(dbwashrooms) {
			res.json(dbwashrooms);
		});
	});

	app.get("/api/washrooms/:rating", function(req, res) {
		const rating = req.params.rating;

		db.Washroom.findAll({
			where: {
				overallRating: {
					[Op.gte]: rating
				}
			}
		}).then(function(dbwashrooms) {
			res.json(dbwashrooms);
		});
	});

	// Create a new washroom
	app.post("/api/washrooms", function(req, res) {

		const washroomData = req.body;
		washroomData.overallRating = parseInt(washroomData.overallRating);

		let geolocationQuery;
		geolocationQuery = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&searchtext=`;
		geolocationQuery += encodeURIComponent(washroomData.address + ', Toronto, Canada');

		console.log(geolocationQuery);
		// make GET request to geolocater API to get lattitude and longitude
		axios.get(geolocationQuery).then(response => {

			const coords = response.data.Response.View[0].Result[0].Location.DisplayPosition;

			washroomData.latitude = parseFloat(coords.Latitude);
			washroomData.longitude = parseFloat(coords.Longitude);

			console.log(washroomData);
		
			db.Washroom.create(washroomData).then(function(dbwashroom) {
				res.json(dbwashroom);
			});

		}).catch(error => {
			if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an object that comes back with details pertaining to the error that occurred.
			console.log(error.request);
			} else {
			// Something happened in setting up the request that triggered an Error
			console.log("Error", error.message);
			}
			console.log(error.config);
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
