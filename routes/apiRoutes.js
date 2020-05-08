var db = require("../models");

module.exports = function(app) {
    // Get all users
    app.get("/api/user", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Create a new user
    app.post("/api/user", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Delete an user by id
    app.delete("/api/user/:id", function(req, res) {
        db.User.destroy({ where: { id: req.params.id } }).then(function(
            dbUser
        ) {
            res.json(dbUser);
        });
    });
};
