var db = require("../models");

module.exports = function (app) {
    // Load index page
    app.get("/", function (req, res) {
        db.User.findAll({}).then(function (dbUser) {
            res.render("index", {
                msg: "Welcome!",
                username: dbUser
            });
        });
        res.render("index");
    });

    // Load login page
    app.get("/login", function (req, res) {
        res.render("login");
    });

    // from starter code
    // db.User.findOne({ where: { id: req.params.id } }).then(function(
    //     dbUser
    // ) {
    //     res.render("login", {
    //         msg: "login page",
    //         user: dbUser
    //     });
    // });

    // Load register page and pass in an example by id
    app.get("/register", function (req, res) {
        res.render("register");
    });

    //from starter code 
    // db.User.findOne({ where: { id: req.params.id } }).then(function(
    //     dbUser
    // ) {
    //     res.render("register", {
    //         msg: "register page",
    //         user: dbUser
    //     });
    // });

    // Load detail page and pass in an example by id
    app.get("/detail", function (req, res) {
        res.render("detail");
    });

    //from starter code
    // db.User.findOne({ where: { id: req.params.id } }).then(function(
    //     dbUser
    // ) {
    //     res.render("detail", {
    //         msg: "detail page",
    //         user: dbUser
    //     });
    // });

    // Load fav page and pass in an example by id
    app.get("/favs", function (req, res) {
        res.render("favs");
    });

    //from starter code
    // db.User.findOne({ where: { id: req.params.id } }).then(function(
    //     dbUser
    // ) {
    //     res.render("detail", {
    //         msg: "detail page",
    //         user: dbUser
    //     });
    // });

    // Load user page and pass in an example by id
    app.get("/users", function (req, res) {
        res.render("user");
    });

    //from starter code
    // db.User.findOne({ where: { id: req.params.id } }).then(function(
    //     dbUser
    // ) {
    //     res.render("detail", {
    //         msg: "detail page",
    //         user: dbUser
    //     });
    // });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};

