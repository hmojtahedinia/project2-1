module.exports = function(sequelize, DataTypes) {
  var washroom = sequelize.define("washroom", {
    id: DataTypes.STRING,
    nameOfPlace: DataTypes.STRING,
    address: DataTypes.STRING,
    overalRating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  });
  return washroom;
};
// I made a change
