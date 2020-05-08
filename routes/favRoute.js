// Routes for displaying and saving data to db

// Require models
var db = require("../models");

// Routes
module.exports = function(app) {
    // Create a new fav
    app.post("/api/favs", function(req, res) {
        db.Fav.create({
            where: {
                id: req.body.id
            },
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    // Delete a fav by id
    app.delete("/api/favs/:id", function(req, res) {
        db.Fav.destroy({ where: { id: req.params.id } }).then(function(
            dbUser
        ) {
            res.json(dbUser);
        });
    });

    // PUT route for updating favs
    app.put("/api/favs", function(req, res) {
        db.Fav.update(req.body, {
            where: {
                id: req.body.id
            },
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });
};
