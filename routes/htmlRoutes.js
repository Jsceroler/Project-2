const db = require("../models");
const fetch = require("node-fetch");
const qs = require("qs");
require("dotenv").config();

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        if (req.session.username) {
            console.log(req.session.username);
            res.render("index", {
                username: req.session.username
            });
        } else {
            res.render("index");
        }
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

    // Logout
    app.get("/logout", function(req, res){
        req.session.destroy();
        res.redirect("/");
    });

// Load register page 
    app.get("/register", function (req, res) {
        if (req.session.username) {
            res.render("index", {message: "You are already logged in! If you want to create a new account please log out first."})
        } else {
            res.render("register", {message: "Please enter a username and password you would like to use"});
        }
    });

    // Load detail page --Leaving this commented out since we probably won't use this--
    // app.get("/detail", function (req, res) {
    //     res.render("detail");
    // });

// Load fav page 
    app.get("/favs", function (req, res) {
        if (req.session.username) {
            db.Favs.findAll().then(function (dbFavs) {
                res.json(dbFavs);
            });
            // res.render("favs", { 
            //     usernameDisplay: "You are logged in as: " + req.session.username,
            //     message: "Display the saved favs, or something saying no favs have been saved."});
        }
        else {
            res.render("favs", {message: "You are not logged in, if you would like to look at favs please log in"});
        }
    });

    //multiple options: size, gender, age, coat

    app.post("/", function(req, res) {
        let animalSearch = {
            type: req.body.animal,
            size: valueCheck(req.body.size),
            gender: valueCheck(req.body.gender),
            age: valueCheck(req.body.age),
            coat: valueCheck(req.body.coat),
            good_with_children: req.body.good_with_children,
            good_with_dogs: req.body.goodwithdogs,
            good_with_cats: req.body.goodwithcats,
            location: req.body.zip,
            id: req.body.id
        };
        apiFetch(animalSearch).then((animalObj) => {
            if (req.session.username) {
                res.render("index", {
                    username: req.session.username,
                    animalObj: animalObj
                });
            } else {
                res.render("index", { animalObj });
            }
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
    const query = qs.stringify(params);
    return fetch(
        `https://api.petfinder.com/v2/animals/?${query}&limit=6`,
        // search query URL that will use all the params
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
        .then((response) => response.json());
}

function valueCheck(value){
    if(typeof(value)==="object"){
        value = Object.keys(value).map(function(k){return value[k]}).join(",");
        return value;
    }
    else{
        return value;
    }
}

