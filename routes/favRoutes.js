// Routes for displaying and saving data to db

// Require models
var db = require("../models");
const fetch = require("node-fetch");
// Routes
module.exports = function(app) {
    app.get("/favs", function(req, res) {
        if (req.session.username) {
            db.Favs.findAll({
                where: {
                    username: req.session.username,
                },
            }).then(function(userFavs) {
                console.log(userFavs);
                let favResults = [];
                for (let fav of userFavs) {
                    favResults.push(apiFetch(fav.petid));
                }
                Promise.all(favResults).then(function(savedFav){
                    console.log(savedFav);
                    res.render("favs", {
                        savedFav: savedFav
                    });
                })
                
            });
        } else {
            res.render("favs", {
                message: "Sorry, you need to be signed in to views favs",
            });
        }
    });

    app.post("/favs", function(req, res) {
        // console.log(req.body);
        let petId = req.body.petId;
        if (req.session.username) {
            // console.log("yay fav", petId);
            db.Favs.create({
                username: req.session.username,
                petid: petId,
            }).then(function() {
                //database stuff
                res.status(200).send("200");
            });
        } else {
            res.status(401).send("401");
            // error 401
        }
    });

    app.delete("/favs", function(req, res) {
        if (req.session.username) {
            db.Favs.destroy({
                where: {
                    username: req.session.username,
                    petid: req.body.deleteId
                }
            }).then(function(dbFavs){
                res.json(dbFavs);
            })
        } else {
            res.render("favs", {
                message: "Sorry, you need to be signed in to views favs",
            });
        }
        
    } )
};

function apiFetch(id) {
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
            return fetchAnimals(id, token);
        });
}

// Fetch animals from the API
function fetchAnimals(id, token) {
    // console.log("these are the ids ", id);
    // fetch pets
    // get data using the token
    return fetch(
        `https://api.petfinder.com/v2/animals/${id}`,
        // search query URL that will use all the params
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((response) => response.json());
}
