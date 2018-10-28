var topics = ["perfect loops","fast cars","people failing","dogs doing tricks","cats malfunctioning"]

window.onload = function () {

    // Click event listener for the search button, calls the populateGifs function and adds a new topic button from the search bar...
    $("#button-addon2").on("click", function() {
        populateGifs($("#searchBar").val().trim());
        var topicBtn = $("<button>");
        var btnTitle = $("#searchBar").val().trim();
        topicBtn.text(btnTitle);
        topicBtn.attr("class","btn topicButton");
        topicBtn.attr("id",btnTitle);
        $("#buttonArea").append(topicBtn);
    });

    // Click event listener for topic buttons...
    $(document).on("click", ".topicButton", function() {
        populateGifs(this.id);
    });

    // Function to populate gifs when a search is executed or a topic button is clicked...
    // Giphy API...
    var populateGifs = function(search) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

            var results = response.data;

            // Loop that populates 10 gifs with attributes...
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating " + results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("width", "100%");
                gifImage.attr("id", results[i].id);
                gifImage.attr("class","gifImage");
                gifImage.attr("data-state","still")
                gifImage.attr("data-still",results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height.url);
                gifDiv.append(gifImage);
                gifDiv.append(p);
                gifDiv.attr("id", "gif"+i);
                gifDiv.attr("class","gifDiv");
                gifDiv.attr("style","max-width:20%; display:inline-block; padding: 5px");
                $("#gifArea").prepend(gifDiv);
            };
        });
    };

    // Function that plays and pauses gifs...
    $(document).on("click",".gifImage",function() {
        state = ($(this).attr("data-state"));

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });

    // Function that populates the initial topic buttons...
    for(i = 0; i < topics.length; i++) {
        var topicBtn = $("<button>");
        var btnTitle = topics[i];
        topicBtn.text(btnTitle);
        topicBtn.attr("class","btn topicButton");
        topicBtn.attr("id",btnTitle);
        $("#buttonArea").append(topicBtn);
    };
}