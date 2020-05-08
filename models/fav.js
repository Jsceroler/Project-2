module.exports = function(sequelize, DataTypes) {
    var Fav = sequelize.define("Fav", {
        username: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        },
        petid: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1]
        }
    });

    return Fav;
};