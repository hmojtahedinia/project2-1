module.exports = function(sequelize, DataTypes) {
  var Washroom = sequelize.define("Washroom", {
    id: DataTypes.STRING,
    nameOfPlace: DataTypes.STRING,
    address: DataTypes.STRING,
    overalRating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  });
  return Washroom;
};
// I made a change
