const db = require("../models");
const fetch = require("node-fetch");
require("dotenv").config();

console.log(process.env);

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.render("index");
    });

    // Load login page
    app.get("/login", function (req, res) {
            if (req.session.username) {
                res.render("index", {
                    message: "Logged in as: ",
                    username: req.session.username
                });
            } else {
                res.render("login", {message: "Please enter your username and password to login."});
            }
        });

// Load register page 
    app.get("/register", function (req, res) {
        if (req.session.username) {
            console.log("already logged in");
        } else {
            res.render("register");
        }
    });

    // Load detail page 
    app.get("/detail", function (req, res) {
        res.render("detail");
    });

    // Load detail page --Leaving this commented out since we probably won't use this--
    // app.get("/detail", function (req, res) {
    //     res.render("detail");
    // });

// Load fav page 
    app.get("/favs", function (req, res) {
        if (req.session.username) {
            res.render("favs");
        }
        else {
            res.render("login");
        }
    });


    app.post("/", function(req, res) {
        let animalSearch = {
            animal: req.body.animal,
            // key value set up for the other search params
            // size: req.body.size,
            // gender: req.body.gender,
            // age: req.body.age,
            // coat: req.body.coat,
            // good_with_children: req.body.good_with_children,
            // good_with_dogs: req.body.good_with_dogs,
            // good_with_cats: req.body.good_with_cats,
            zip: req.body.zip
        };
        apiFetch(animalSearch).then((animalObj) => {
            res.render("index", { animalObj });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};

function apiFetch(searchParams) {
    let token;
    //get the token first
    return fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${process.env.KEY}&client_secret=${process.env.SECRET}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
    })
        .then((response) => response.json())
        .then((data) => {
            token = data.access_token;
            return fetchAnimals(searchParams, token);
        });
}

// Fetch animals from the API
function fetchAnimals(params, token) {
    // fetch pets
    // get data using the token
    return fetch(
        `https://api.petfinder.com/v2/animals/?type=${params.animal}&location=${params.zip}`,
        // search query URL that will use all the params
        // `https://api.petfinder.com/v2/animals/?type=${params.animal}&size=${params.size}&gender=${params.gender}&age=${params.age}&coat=${params.coat}&good_with_children=${params.good_with_children}&good_with_dogs=${params.good_with_dogs}&good_with_cats=${params.good_with_cats}&location=${params.zip}`
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
