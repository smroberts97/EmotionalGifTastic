var emotions = ["happy", "sad", "shy", "crazy", "proud", "scared", "sleepy", "mad", "bored", "excited"];
var showImages = 10;
function displayEmotionImg() {
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
           //images are too big; had to reduce the size to fit on the page and work; reference snippet on stackoverflow 
            var widthSize = parseInt(response.data[i].images.downsized_still.width) / 1.5;
            if (widthSize > 220) {
                widthSize /= 2;
            }

            var aCard = $("<div>");
            // create a card that puts together an img, rating
            aCard.addClass("card-div");
            aCard.attr("width", widthSize);
            // getting the rating and putting it on the page
            var aSpan = $("<span>");
            aSpan.html("Rating: " + response.data[i].rating);
            // getting the image and getting it to be still or animated with attributes; reference snippet on W3 schools
            var anImg = $("<img>");
            anImg.attr("src", stillImgUrl);
            anImg.attr("url-still", stillImgUrl);
            anImg.attr("data-state", "still");
            anImg.attr("url-animate", animateUrl);
            //correct image sizing; reference snippet on stackoverflow
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
        // when fills the page, image is still, click to animate
        $(this).attr("src", $(this).attr("url-animate"));
        $(this).attr("data-state", "animate");
    } else {
        // the clicked image animates, click to make still again
        $(this).attr("src", $(this).attr("url-still"));
        $(this).attr("data-state", "still");
    }
}

function renderButtons() {
    $("#buttons-view").empty();
    // Loops array to add buttons
    for (var i = 0; i < emotions.length; i++) {
        var btn = $("<button>");
        btn.addClass("emotion");
        btn.addClass("btn");
        btn.addClass("btn-default");
        btn.attr("onmouseover", "style.background='orange'");
        btn.attr("data-name", emotions[i]);
        btn.text(emotions[i]);
        // Add button
        $("#buttons-view").append(btn);
    }
}

$("#emotion-add").on("click", function(event) {
    event.preventDefault();
    var emotionAdd = $("#emotion-input").val().trim();
    // Do not add empty button in
    if (emotionAdd.length === 0)
        return;
    // Do not add duplicate
    if (emotions.includes(emotionAdd)) {
        alert("Done got it, try another");
        return;
    }

    emotions.push(emotionAdd);
    // process array and make into buttons
    renderButtons();
});

// click event listener class
$(document).on("click", ".gif", imgClickHandler);
$(document).on("click", ".emotion", displayEmotionImg);

//make buttons
renderButtons();