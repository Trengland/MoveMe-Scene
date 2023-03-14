// SM - Function for trending movie data
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let trendingListEl = $("#trending-container");
let trendingImageUrl = "https://image.tmdb.org/t/p/w300/"
let trendingUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKeyTMBD + "&language=en-US&page=1";

$(function () {
    fetch(trendingUrl)
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log("Api call successful")
            console.log(data.results);
            displayTrendingMovies(data);
          });
        }
    });
});

// SM - Display Trending Movies Function
function displayTrendingMovies(data) {
    for (let i = 0; i < 20; i++) {
        let trendingPoster = data.results[i].poster_path;
        let trendingTitle = data.results[i].title;
        let trendingOverview = data.results[i].overview;

        let trendingCardEl = document.createElement('div');
        trendingCardEl.setAttribute('class', 'column is-one-third p-5');
        trendingCardEl.innerHTML = "<div class='card is-fullheight p-4'><div class='card-image'><img src=" + trendingImageUrl + trendingPoster + "></div><div class='card-content'><p class='title'>" + trendingTitle + "</p></div><div><p class='subtitle has-text-left'>" + trendingOverview + "</p></div></div>"
        trendingListEl.append(trendingCardEl);
    } 
}

// SM - Mobile Menu -- Code from Bulma documentation example js
$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });
  });
  
  // SM - Check for click events on signup button, pop up modal
  $("#signupbutton").click(function() {
  // Toggle is-active class on login modal
  $("#sign-up-modal").addClass("is-active");
  console.log("test");
  });
  
  $(".modal-background").click(function() {
  $("#sign-up-modal").removeClass("is-active");
  });
