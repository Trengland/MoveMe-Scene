//importing quiz data 
import('./quiz.js');


// Variable as a place holder until Team Browns has their variable 
let recommendedMovie = "Grease";
let movieID = "";

// API URL Variables
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMBD + "&language=en-US&query=" + recommendedMovie + "&page=1&include_adult=false";


// Variable Elements from HTML
let trailerSourceEl = document.getElementById('#src');
let trailerVideoEl = document.getElementById('video');
let trailerContainerEl = document.getElementById('trailer-container');

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
                movieID=data.results[0].id;
                Trailers(movieID);                
              });
            }      
        })
    console.log(movieID)
    
}

console.log(movieID)

// CL - Function for Trailers API
// Function to populate Trailer with movie ID

function Trailers (movieID) {
    console.log(movieID);
    let trailerURL = "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + apiKeyTMBD + "&language=en-US";
    let videoURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKeyTMBD + "&append_to_response=videos,images";
   
    fetch(trailerURL)
    .then(function(response){
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                // Pull they video key from the API Trailer Array
                 let videoKey = data.results[0].key;
                 console.log(videoKey);
                //  Create the Youtube Link with the key of the video
                let YoutubeLink = "youtube.com/watch?v=" + videoKey;
                console.log(YoutubeLink);
                // Update Trailer element in HTML to have the new Youtube Link
                trailerSourceEl.setAttribute('src', YoutubeLink);
                // trailerSourceEl.textContent = YoutubeLink;
                trailerContainerEl.textContent = YoutubeLink;

                
                  });
            }
            else {
                console.log('getVideos API call not working');
            }
        }
    )}

        // Function to play the movie trailer
        function playTrailer (params) {
            
        }



