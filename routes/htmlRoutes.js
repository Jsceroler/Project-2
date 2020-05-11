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

    //from starter code
    // db.User.findOne({ where: { id: req.params.id } }).then(function(
    //     dbUser
    // ) {
    //     res.render("detail", {
    //         msg: "detail page",
    //         user: dbUser
    //     });
    // });

    app.post("/", function(req, res) {
        const validZip = /^\d{5}$/;

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
            });

        function showAnimals(animalInfo) {
            animalInfo.forEach((animal) => {
                let image;
                if (animal.photos.length > 0) {
                    image = animal.photos[0].medium;
                } else {
                    image =
                        "<a href='https://placeholder.com'><img src='https://via.placeholder.com/150'></a>";
                }
            });
        }

        // Fetch animals from the API
        function fetchAnimals(animal, zip) {
            // fetch pets
            // get data using the token
            fetch(
                `https://api.petfinder.com/v2/animals/?type=${animal}&contact.address.postcode=${zip}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    showAnimals(data.animals);
                });
        }
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
