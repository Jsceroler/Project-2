$(".fa-star").click(function() {
    $(this).toggleClass("fas far");

    // var IDnum = $(this).attr("id");

    var state = $(this).attr("data-state");
    if (state === "false"){
        $(this).attr("data-state", "true");
        // data.ref().push(IDnum);
        // //data-> to mysql db, favs table by session username
    }
    else {
        $(this).attr("data-state", "false");
        // var favID = $(this).attr("id");
        // var deleteFav = firebase.database().ref(favID);
        // // delete from mysql db favs table by session username
        // deleteFav.remove();
    }
})
