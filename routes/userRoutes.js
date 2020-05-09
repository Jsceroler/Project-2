// Routes for displaying and saving data to db

// Require models
var db = require("../models");

// Routes
module.exports = function(app) {
    // Get all users
    app.get("/api/users/", function(req, res) {
        db.User.findAll({}).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });

    // Create a new user
    app.post("/api/users", function(req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
};
