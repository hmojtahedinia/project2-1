/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const axios = require('axios');
const Sequelize = require('sequelize');
const db = require('../models');

const { Op } = Sequelize;

module.exports = (app) => {
  // Get all washrooms
  app.get('/api/washrooms', (req, res) => {
    db.Washroom.findAll({}).then((dbwashrooms) => {
      res.json(dbwashrooms);
    });
  });

  // Get washrooms of a certain rating or higher
  app.get('/api/washrooms/:rating', (req, res) => {
    const rating = req.params.rating;

    db.Washroom.findAll({
      where: {
        overallRating: {
          [Op.gte]: rating,
        },
      },
    }).then((dbwashrooms) => {
      res.json(dbwashrooms);
    });
  });

  // Create a new washroom
  app.post('/api/washrooms', (req, res) => {
    const washroomData = req.body;
    // eslint-disable-next-line radix
    washroomData.overallRating = parseInt(washroomData.overallRating);

    let geolocationQuery;
    geolocationQuery = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&searchtext=`;
    geolocationQuery += encodeURIComponent(`${washroomData.address}, Toronto, Canada`);

    // make GET request to geolocater API to get lattitude and longitude
    axios.get(geolocationQuery).then((response) => {
      const coords = response.data.Response.View[0].Result[0].Location.DisplayPosition;

      washroomData.latitude = parseFloat(coords.Latitude);
      washroomData.longitude = parseFloat(coords.Longitude);

      db.Washroom.create(washroomData).then((dbwashroom) => {
        res.json(dbwashroom);
      });
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining
        // to the error that occurred.
        throw error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        throw error.message;
      }
    });
  });

  // Delete an washroom by id
  app.delete('/api/washrooms/:id', (req, res) => {
    db.Washroom.destroy({ where: { id: req.params.id } })
      .then((dbwashroom) => {
        res.json(dbwashroom);
      });
  });
};
