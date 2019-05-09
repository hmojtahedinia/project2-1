var db = require("../models");

module.exports = function(app) {
  // Get all washrooms
  app.get("/api/washrooms", function(req, res) {
    db.washroom.findAll({}).then(function(dbwashrooms) {
      res.json(dbwashrooms);
    });
  });

  // Create a new washroom
  app.post("/api/washrooms", function(req, res) {
    db.washroom.create(req.body).then(function(dbwashroom) {
      res.json(dbwashroom);
    });
  });

  // Delete an washroom by id
  app.delete("/api/washrooms/:id", function(req, res) {
    db.washroom
      .destroy({ where: { id: req.params.id } })
      .then(function(dbwashroom) {
        res.json(dbwashroom);
      });
  });
};
