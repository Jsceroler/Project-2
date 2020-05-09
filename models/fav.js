module.exports = function(sequelize, DataTypes) {
    var Fav = sequelize.define("Fav", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        petid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Fav;
};
