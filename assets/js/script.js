//modal adi movie quotes
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://quotable-api-motivational-funny-and-movie-quotes.p.rapidapi.com/movie_quotes",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Key": 
    "837b163db4msh9ad161c9bfcd50cp1fa0d6jsncd86d97e9bd7",
            "X-RapidAPI-Host": 
    "quotable-api-motivational-funny-and-movie-quotes.p.rapidapi.com"
        }
    };
//displaying results in modal of info pulled from api
    $.ajax(settings).done(function (response) {
        console.log(response);
        var modal = document.getElementById("myModal");
        var btn = document.getElementById("myBtn");
        btn.onclick = function() {
            modal.style.display = "block";}
        $("#movieQuote").append(response.quote);
        $("#movie").append(response.movie);
    });



//importing quiz data 
import('./quiz.js');


// Variable as a place holder until Team Browns has their variable 
let recommendedMovie = "Grease";
let movieID = "";

// API URL Variables
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL;

// Variable Elements from HTML
let trailerSourceEl = document.getElementById('src');
let trailerVideoEl = document.getElementById('video');
let trailerEl = document.getElementById('link-to-trailer');
let videoLink;
// let trailerContainerEl = document.getElementById('trailer-container');


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

// CL
console.log(movieID);

// CL - call getMovie Function
// getMovieID();

// CL & SS - Function to call GET Search Movies to get Movie ID
function getMovieID (title){
    recommendedMovie = title;
    console.log(title);
    idURL= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMBD + "&language=en-US&query=" + recommendedMovie + "&page=1&include_adult=false";
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

console.log(movieID);

// CL - Function for Trailers API
// Function to populate Trailer with movie ID

function Trailers (movieID) {
    console.log(movieID);
    let trailerURL = "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + apiKeyTMBD + "&language=en-US";
    // Chelsea's back up plan if trailerURL doesn't work
    // let videoURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKeyTMBD + "&append_to_response=videos,images";
   
    fetch(trailerURL)
    .then(function(response){
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                // Pull they video key from the API Trailer Array
                 let videoKey = data.results[0].key;
                //  console.log(videoKey);
                let trailerMovieName =data.results[0].name;
                console.log(trailerMovieName);
                //  Create the Youtube Link with the key of the video
                let YoutubeLink = "https://www.youtube.com/watch?v=" + videoKey;
                console.log(YoutubeLink);

                // Find organized list element
                let trailerListEl = document.querySelector("#trailer-list");
            
                // Creates trailer Link list Element
                let li1 = document.createElement("li");
                // li1 = document.setAttribute("id", "list-item")

                // // Add text to link
                li1.innerHTML ='<a href=' +YoutubeLink + '>Watch the trailer video: '+ trailerMovieName + '</a>'

                // Append list items to ordered trailerListEl
                trailerListEl.appendChild(li1);
                
                // Update Trailer element in HTML to have the new Youtube Link
                // trailerSourceEl.setAttribute('src', YoutubeLink);
                // trailerSourceEl.textContent = YoutubeLink;
                // trailerContainerEl.textContent = YoutubeLink;
            });   

            } else {
                // linkTrailerEl.css("display", "none");
                console.log('getVideos API call not working');
            }
        
    })


}    

        // Function to play the movie trailer
        function playTrailer (params) {
            
        }

// SM - Function for trending movie data
let trendingListEl = $("#trending-container");

$(function () {
    let trendingUrl = "https://api.themovidedb.org/3/movie/popular?api_key=" + apiKeyTMBD + "&language=en-US&page=1";
    fetch(trendingUrl);
})

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
myModal.style.display = "none";
}

//  close it 
window.onclick = function (event) {
if (event.target == myModal) {
    myModal.style.display = "none";
}
}
