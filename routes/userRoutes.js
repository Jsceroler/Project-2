// Routes for displaying and saving data to db

// Require models
var db = require("../models");

// Routes
module.exports = function(app) {
    // Get all users
    app.get("/api/users/", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Create a new user
    app.post("/api/users", function(req, res) {
        db.User.create({
            username: req.body.username,
            password: password
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
};
