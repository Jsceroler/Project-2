module.exports = function(sequelize, DataTypes) {
    var Favs = sequelize.define("Favs", {
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
    return Favs;
};
