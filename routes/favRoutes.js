// Routes for displaying and saving data to db

// Require models
var db = require("../models");

// Routes
module.exports = function(app) {
    // Get all favs
    app.get("/api/favs/", function(req, res) {
        db.Fav.findAll({}).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });
    // Create a new fav
    app.post("/api/favs", function(req, res) {
        db.Fav.create({
            where: {
                username: username
            },
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Delete a fav by id
    app.delete("/api/favs/:id", function(req, res) {
        db.Fav.destroy({ where: { petid: req.params.id } }).then(function(
            dbUser
        ) {
            res.json(dbUser);
        });
    });

    // PUT route for updating favs
    app.put("/api/favs", function(req, res) {
        db.Fav.update(req.body, {
            where: {
                username: username
            }
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
};
