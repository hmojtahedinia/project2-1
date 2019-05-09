module.exports = function(sequelize, DataTypes) {
    var Washroom = sequelize.define("User", {
        userName: DataTypes.STRING,
        password: DataTypes.STRING,
        lastLogin: DataTypes.DATE
    });

    return Washroom;
};