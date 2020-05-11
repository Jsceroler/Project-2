const db = require("../models");
const fetch = require("node-fetch");
require("dotenv").config();

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.render("index");
    });

    // Load login page
    app.get("/login", function(req, res) {
        res.render("login");
    });

    // Load register page and pass in an example by id
    app.get("/register", function(req, res) {
        res.render("register");
    });

    // Load detail page and pass in an example by id
    app.get("/detail", function(req, res) {
        res.render("detail");
    });

    // Load fav page and pass in an example by id
    app.get("/favs", function(req, res) {
        res.render("favs");
    });

    app.post("/", function(req, res) {
        let animalObj = {};
        let animalSearch = {
            animal: req.body.animal,
            zip: req.body.zip
        };
        apiFetch(animalSearch);
        res.render("index", animalObj);
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};

function apiFetch(searchParams){
    let token;
    //get the token first
    fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${process.env.KEY}&client_secret=${process.env.SECRET}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
    })
        .then((response) => response.json())
        .then((data) => {
            token = data.access_token;
            fetchAnimals(searchParams, token);
        });
}

// Fetch animals from the API
function fetchAnimals(params, token) {
    // fetch pets
    // get data using the token
    fetch(
        `https://api.petfinder.com/v2/animals/?type=${params.animal}&contact.address.postcode=${params.zip}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            animalObj = {
                data
            };
        });
}