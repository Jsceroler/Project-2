// Routes for displaying and saving data to db

// Require models
var db = require("../models");

// Routes
module.exports = function (app) {

    app.get("/favs", function (req, res) {
        db.Favs.findAll().then(function (dbFavs) {
            res.json(dbFavs);
        });
    });

    // // Create a new fav
    // app.post("/favs", function (req, res) {
    //     db.Favs.create({
    //         where: {
    //             username: username
    //         },
    //     }).then(function (dbUser) {
    //         res.json(dbUser);
    //     });
    // });

    // // Delete a fav by id
    // app.delete("/favs", function (req, res) {
    //     db.Favs.destroy({ where: { petid: req.params.id } }).then(function (
    //         dbUser
    //     ) {
    //         res.json(dbUser);
    //     });
    // });
};



// $(recipeCard).find(".fa-star").click(function() {
//     $(this).toggleClass("fas far");

//     var IDnum = $(this).attr("data-recipeNum");

//     var state = $(this).attr("data-state");
//     if (state === "false"){
//         $(this).attr("data-state", "true");
//         data.ref().push(IDnum);
//     }
//     else {
//         $(this).attr("data-state", "false");
//         var favID = $(this).attr("id");
//         var deleteFav = firebase.database().ref(favID);
//         deleteFav.remove();
//         $("#"+IDnum).empty();
//     }
// })
// valueReset();
// return recipeCard;

