// Routes for displaying and saving data to db

// Require models
var db = require("../models");

// Routes
module.exports = function (app) {
    // Get all users
    app.get("/api/users/", function (req, res) {
        db.User.findAll({}).then(function (dbUsers) {
            res.json(dbUsers);
        });
    });

    db.User.findAll({
        where: query,
        include: [db.User]
    }).then(function (dbPost) {
        res.json(dbPost);
    });
};

// Create a new user
app.post("/api/users", function (req, res) {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(function (dbUser) {
        res.json(dbUser);
    });
});

// DELETE route for deleting posts
app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbUser) {
        res.json(dbUser);
    });
});


// PUT route for updating User
app.put("/api/user", function (req, res) {
    db.User.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
});

