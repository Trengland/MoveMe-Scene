// Variable as a place holder until Team Browns has their variable 
let recommendedMovie = "Grease";
let movieID = [];


// API URL Variables
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMBD + "&language=en-US&query=" + recommendedMovie + "&page=1&include_adult=false";
let trailerURL = "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + apiKeyTMBD + "&language=en-US";

// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=87ceec9af92ce89acfb2e11778f0841f&language=en-US

// Document Query Selector
// let trailerContainerEl;

// Mobile Menu -- Code from Bulma documentation example js
$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });

  // Check for click events on login button
  $(".login-button").click(function() {
    // Toggle is-active class on login modal
    $(".modal-login")
  })
});

// CL
console.log(movieID);

// CL - call getMovie Function
getMovieID();

// CL & SS - Function to call GET Search Movies to get Movie ID
function getMovieID (){
    fetch(idURL)
    .then(function(response){
        if (response.ok) {
            // need to look at other examples to make sure the .then below is correct as instructor said this isn't happening
            response.json().then(function (data) {
                console.log("API call was a success!");
                console.log(data.results[0].id);
                movieID.push(data.results[0].id);
                // let variableID = ;
              });
            }      
        })
    
    Trailers();
}


// CL - Function for Trailers API
// Function to populate Trailer with movie ID
function Trailers () {
    fetch(trailerURL)
    .then(function(response){
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                  });
            }
            else {
                console.log('getVideos API call not working');
            }
        }
    )}




// CL - Variables
// let recommendedMovie = "Elf";
// let apiKeyTMBD = ;
// let queryURL = 'https://api.themoviedb.org/4/list/1?api_key=' + apiKeyTMBD;

// CL - Function to call Trailers API



//Log quiz question results 



