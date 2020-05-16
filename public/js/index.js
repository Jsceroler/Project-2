$(".fa-star").click(function() {

    $(this).toggleClass("fas far");

    let petId = {
        petId: $(this).attr("id")
    }
    

    let state = $(this).attr("data-state");
    if (state === "false"){
        $(this).attr("data-state", "true");

        $.ajax("/favs", {
            type: "POST",
            data: petId
        }).then(
            function(res) {
            }
        ).fail(
            function(err){
                alert("You need to log in to save as fav");
                //need to stop the toggle
            }
        )
    }
    // else {
    //     $(this).attr("data-state", "false");

    //     $.ajax("/favs", {
    //         type: "DELETE",
    //         data: petId
    //     }).then(
    //         function(res){
    //         }
    //     ).fail(
    //         function(err){
    //             alert("You need to log in to save as fav");
    //         }
    //     )

    // }
})

$(".delete").click(function() {
    let deleteId = {
        deleteId: $(this).attr("id")
    }

    $.ajax("/favs", {
        type: "DELETE",
        data: deleteId
    }).then(
        function(res){
            location.reload();
        }
    ).fail(
        function(err){
            alert("Oops. something broke! Sorry!");
        }
    )
})