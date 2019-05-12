module.exports = function(sequelize, DataTypes) {
    var Washroom = sequelize.define("Washroom", {
      nameOfPlace: DataTypes.STRING,
      address: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      overallRating: DataTypes.INTEGER,
      comment: DataTypes.TEXT
    });
    return Washroom;
  };
  // I made a change
