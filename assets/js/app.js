var emotions = ["happy", "sad", "shy", "crazy", "proud", "scared", "sleepy", "mad", "bored", "excited"];
var showImages = 10;
function displayemotionImg() {
    $("#img-display").empty();

    var emotion = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=RpbF7yK9jdJvEIcxqxFvfqB36r3852SI&limit=" + showImages;

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < showImages; i++) {
            var stillImgUrl = response.data[i].images.downsized_still.url;
            var animateUrl = response.data[i].images.downsized.url;
            // shrink the image size
            var widthSize = parseInt(response.data[i].images.downsized_still.width) / 1.5;
            if (widthSize > 220) {
                widthSize /= 2;
            }

            var aCard = $("<div>");
            // a card contains an img name rating and an img
            aCard.addClass("card-div");
            aCard.attr("width", widthSize);
            // For image rating
            var aSpan = $("<span>");
            aSpan.html("Rating: " + response.data[i].rating);
            // For image
            var anImg = $("<img>");
            anImg.attr("src", stillImgUrl);
            anImg.attr("url-still", stillImgUrl);
            anImg.attr("data-state", "still");
            anImg.attr("url-animate", animateUrl);

            anImg.attr("width", widthSize);
            anImg.addClass("gif");
            aCard.append(aSpan, anImg);
            $("#img-display").prepend(aCard);

        }
    });
}

function imgClickHandler() {
    var dataState = $(this).attr("data-state");
    if (dataState === "still") {
        // the clicked image's state is still, update to animate
        $(this).attr("src", $(this).attr("url-animate"));
        $(this).attr("data-state", "animate");
    } else {
        // the clicked image's state is animate, update to still
        $(this).attr("src", $(this).attr("url-still"));
        $(this).attr("data-state", "still");
    }
}

function renderButtons() {
    $("#buttons-view").empty();
    // Loops through the emotions array to add as buttons
    for (var i = 0; i < emotions.length; i++) {
        var btn = $("<button>");
        btn.addClass("emotion");
        btn.addClass("btn");
        btn.addClass("btn-default");
        btn.attr("onmouseover", "style.background='orange'");
        btn.attr("data-name", emotions[i]);
        btn.text(emotions[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(btn);
    }
}

$("#add-emotion").on("click", function(event) {
    event.preventDefault();
    var emotionAdd = $("#emotion-add").val().trim().toLowerCase();
    // Do not add empty button in
    if (emotionAdd.length === 0)
        return;
    // Do not add dups
    if (emotions.includes(emotionAdd)) {
        alert("Done got it, try another");
        return;
    }

    emotions.push(emotionAdd);
    // Calling renderButtons which handles the processing of emotions array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", imgClickHandler);

// Adding click event listeners to all elements with a class of "emotion"
$(document).on("click", ".emotion", displayemotionImg);

// Calling the renderButtons function to display the intial buttons
renderButtons();