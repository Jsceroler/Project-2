// Routes for displaying and saving data to db

// Require models
const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//salt round => cost factor controls how much time is needed to calculate a single bCrypt hash. higher cost factor -> more hashing rounds. Salt is a random value, store hash-string, also stores the saltn no less that 12 for production ready code.

// Routes
module.exports = function (app) {
//Login page
    app.post("/login", function(req, res) {
        db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(user){
            if (!user){
                res.redirect("/");
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result == true) {
                        console.log("logged in as " + req.body.username);
                        req.session.username = req.body.username;
                        res.redirect("/");
                    } else {
                        res.render("login", {message: "The username or password you entered does not match an existing account."});
                    }
                });
            }
        });
    });

    // Create a new user
    app.post("/register", function(req, res) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash){
            db.User.create({
                username: req.body.username,
                password: hash
            }).then(function(data) {
                if (data) {
                    req.session.username;
                    res.render("index", {
                        message: "Registered! You are now logged in as: ",
                        username: req.body.username
                    });
                }
            });
        });
    });
};