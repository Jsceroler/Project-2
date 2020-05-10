var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            is: ["^[a-z]+$", "i"],
            allowNull: false,
            required: true,
            min: 4
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            min: 4
        }
    }, {
        timestamps: false
    }
    );

    //generate hash
    User.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.localPassword);
    };
    return User;
};

