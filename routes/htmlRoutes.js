var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        // db.User.findAll({}).then(function(dbUser) {
        //     res.render("index", {
        //         msg: "Welcome!",
        //         username: dbUser
        //     });
        // });
        res.render("index");
    });

    // Load login page and pass in an example by id
    app.get("/login", function(req, res) {
        // db.User.findOne({ where: { id: req.params.id } }).then(function(
        //     dbUser
        // ) {
        //     res.render("login", {
        //         msg: "login page",
        //         user: dbUser
        //     });
        // });
        res.render("login");
    });

    // Load register page and pass in an example by id
    app.get("/register", function(req, res) {
        // db.User.findOne({ where: { id: req.params.id } }).then(function(
        //     dbUser
        // ) {
        //     res.render("register", {
        //         msg: "register page",
        //         user: dbUser
        //     });
        // });
        res.render("register");
    });

    // Load detail page and pass in an example by id
    app.get("/detail", function(req, res) {
        // db.User.findOne({ where: { id: req.params.id } }).then(function(
        //     dbUser
        // ) {
        //     res.render("detail", {
        //         msg: "detail page",
        //         user: dbUser
        //     });
        // });
        res.render("detail");
    });

    // Load fav page and pass in an example by id
    app.get("/fav", function(req, res) {
        // db.User.findOne({ where: { id: req.params.id } }).then(function(
        //     dbUser
        // ) {
        //     res.render("detail", {
        //         msg: "detail page",
        //         user: dbUser
        //     });
        // });
        res.render("fav");
    });

// Load user page and pass in an example by id
app.get("/user", function(req, res) {
    // db.User.findOne({ where: { id: req.params.id } }).then(function(
    //     dbUser
    // ) {
    //     res.render("detail", {
    //         msg: "detail page",
    //         user: dbUser
    //     });
    // });
    res.render("user");
});

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};

