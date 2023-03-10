
// Starter Variables
let recommendedMovie = "";
let movieID = "";
let parseData ;

// API URL Variables
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL;

// Variable Elements from HTML
let trailerSourceEl = document.getElementById('src');
let trailerVideoEl = document.getElementById('video');
let trailerEl = document.getElementById('link-to-trailer');
let recommendedTitleEl = document.getElementById("recommended-title");
let resultsSectionEl = document.getElementById("results");
let frameContainer = document.querySelector(".frame-container");


// Variables defined to show & hide HTML elements on page
let quizContainerEl = $("#quiz-container");
let trailerContainerEl= $('#link-to-trailer');
let resultsContainerEl = $("#results");
let resultsTitleEl = $("#recommended-title");
let takeQuizEl = $("#take-quiz-again");

let resultsHeader = $("#textResults");


quizContainerEl.css("display", "block");
resultsContainerEl.css("display", "none");
resultsTitleEl.css("display", "none");
trailerContainerEl.css("display","none");
takeQuizEl.css("display","none");
resultsHeader.css("display", "none");

let history = JSON.parse(localStorage.getItem("movieChoices"))
console.log(history)

if (history === null) {
    resultsHeader.append('')

} else {


for (let i = 0; i < history.length; i++) {
    let item = document.createElement("p")
    item.textContent = history[i].init +`: `+ history[i].certString +` `+ history[i].runTimeLTE +`(`+ history[i].releaseDateStart +` - `+ history[i].releaseDateEnd +`)`
    resultsHeader.append(item)
};

}

$(function () {
	const apiKey = "bb20124838543378f16ab68d72df5e76";

	$("#searchBtn").click(function () {

		//build selection criteria
		var releaseDateStart = $("#release-start").val();
		var releaseDateEnd = $("#release-end").val();
		var runtimeLTE = $("#runtime").val();
		var genreIds = "";
		$("input[name='genres']:checked").each(function () {
			genreIds += $(this).val() + "|";
		});

		var certString = "";
		$("input[name='certifications']:checked").each(function () {
			certString += $(this).val() + "|";
		});

		/*
		{id: 28, name: 'Action'}
		{id: 12, name: 'Adventure'}
		{id: 16, name: 'Animation'}
		{id: 35, name: 'Comedy'}
		{id: 80, name: 'Crime'}
		{id: 99, name: 'Documentary'}
		{id: 18, name: 'Drama'}
		{id: 10751, name: 'Family'}
		{id: 14, name: 'Fantasy'}
		{id: 36, name: 'History'}
		{id: 27, name: 'Horror'}
		{id: 10402, name: 'Music'}
		{id: 9648, name: 'Mystery'}
		{id: 10749, name: 'Romance'}
		{id: 878, name: 'Science Fiction'}
		{id: 10770, name: 'TV Movie'}
		{id: 53, name: 'Thriller'}
		{id: 10752, name: 'War'}
		{id: 37, name: 'Western'}
		 */

		var baseURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_original_language=en&";
		var variables = "release_date.gte=" + releaseDateStart + "&release_date.lte=" + releaseDateEnd  + "&with_genres=" + genreIds  + "&with_runtime.lte=" + runtimeLTE + "&certification_country=US&certification=" + certString;

		const settings = {
			"async": true,
			"crossDomain": true,
			"url": baseURL + variables,
			"method": "GET",
			"headers": {}
		};

		$.ajax(settings).done(function (response) {			
			displayResults(response);
			hideQuiz();
			addRecommendedTitle();
		});
	});

	function displayResults(results) {
        console.log("Showing the following results")
		console.log(results);
		$("#results").empty();
		// console.log("Called Display Results")
		for (var i = 0; i < 5; i++) {
			var title = results.results[i].title;
			var overview = results.results[i].overview;
			var releaseDate = results.results[i].release_date;
			var poster = results.results[i].poster_path;
			var count = i + 1;

			$("#results").append("<div class='pad-8'><img src='https://image.tmdb.org/t/p/original" + poster + "' class='poster'/></div>");
			$("#results").append("<div class='pad-8'>#" + count + ": " + title + "<span class='margin-left-10 small-text'>Released: " + dayjs(releaseDate).format('MM/DD/YYYY') + "</span></div>");
			$("#results").append("<div class='pad-8'>" + overview + "</div>");

			// SM - Thumbs up and down buttons
			$("#results").append("<div class='pad-8 is-centered buttons'><button class='button thumbs-up-btn' id='thumbsUpBtn'><span class='icon'><i class='fa-solid fa-thumbs-up'></i></span></button><button class='button thumbs-down-btn' id='thumbsDownBtn'><span class='icon'><i class='fa-solid fa-thumbs-down'></i></span></button></div><hr class='hr'>");
			console.log("title" + title);
			getMovieID (title);
		}
	}
})

// Function to call GET Search Movies to get Movie ID
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
                let movieID=data.results[0].id;
                Trailers(movieID);                
              });
            }      
        })
}



// Function to populate Trailer with movie ID
function Trailers (movieID) {
    let videoURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKeyTMBD + "&append_to_response=videos,images";
   
    fetch(videoURL)
    .then(function(response){
            if (response.ok) {
                response.json()
				.then(function (data) {
                	console.log(data);	
					if (data.videos.results.length != 0) {
						let youTubeKey = data.videos.results[0].key;
						let trailerListEl = document.querySelector("#trailer-list");
						let frame =  document.createElement("iframe");
						frame.setAttribute ("src","https://www.youtube.com/embed/" + youTubeKey );
						frame.setAttribute("name", "Trailer Video");
						frame.setAttribute("id", "frame");
						frame.frameborder = 0;
						frame.width = 560;
						frame.height = 315;
						frame.position = 'absolute';
						frame.allowFullscreen = true;
						frameContainer.append(frame);
					}	 else {	
						// Creates paragraph element
						let noVideosFound = document.createElement("p");

						// Add text to paragraph element
						noVideosFound.textContent= 'Unfortunately, there are no video trailers for the movie' 

						// Append paragraph element to trailerListEl
						frameContainer.append(noVideosFound);	
						}
				});
			} else {
				console.log("error");
				
			}  
		}); 	
};	

// SM - Mobile Menu -- Code from Bulma documentation example js
$(document).ready(function() {

	// Check for click events on the navbar burger icon
	$(".navbar-burger").click(function() {
  
		// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
		$(".navbar-burger").toggleClass("is-active");
		$(".navbar-menu").toggleClass("is-active");
	});
  });
  
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
	
	// Click event on modal x
	$("#close-modal-btn").click(function() {
	$("#sign-up-modal").removeClass("is-active");
	});
	
	// SM - Local Storage of Emails
	$("#submit-button").click(function() {
	let email = document.querySelector(".email-input");
	localStorage.setItem("userEmail", email.value);
	console.log(localStorage);
	$("#sign-up-modal").removeClass("is-active");
	});
	
// Hide the quiz questions when results are displayed
function hideQuiz() {
	quizContainerEl.css("display", "none");
	resultsContainerEl.css("display", "block");
	resultsTitleEl.css("display", "block");
	trailerContainerEl.css("display","block");
	takeQuizEl.css("display","block");
	resultsHeader.css("display", "block");
};

function addRecommendedTitle (){
	// Create an h3 to replace the title at top of movie results
	let recommendedMoviesTitleEl = document.createElement("h3");
	recommendedMoviesTitleEl.setAttribute("class", "title is-size-3");
	recommendedMoviesTitleEl.textContent = "Below is a list of our Top 5 Movie Recommendations for you!";
	// Append list items to ordered trailerListEl
	recommendedTitleEl.appendChild(recommendedMoviesTitleEl);
};

function saveToStorage(e){
    e.preventDefault()
    console.log("saving")
    var releaseDateStart = $("#release-start").val();
	var releaseDateEnd = $("#release-end").val();
	var runtimeLTE = $("#runtime").val();
    let initials = document.querySelector("#initials").value
    var genreIds = "";
		$("input[name='genres']:checked").each(function () {
            console.log($(this))
			genreIds += document.querySelectorAll("#genres").checked
            console.log(genreIds)

            //parseData = JSON.stringify(genreIds)
		});

		var certString = "";
		$("input[name='certifications']:checked").each(function () {

			certString += $(this).val();
		});

    
        console.log(releaseDateStart)
        console.log(releaseDateEnd)
        console.log(runtimeLTE)
        console.log(parseData);
        console.log(certString);

        let searches = JSON.parse(localStorage.getItem("movieChoices")) || [];

        const movieChoices = {
            init:initials, 
            releaseDateStart:releaseDateStart, 
            releaseDateEnd:releaseDateEnd, 
            runTimeLTE:runtimeLTE, 
            genreIds:genreIds, 
            certString:certString 

        } 
        searches.push(movieChoices)
        localStorage.setItem("movieChoices", JSON.stringify(searches))
    }
document.getElementById("submitResults").addEventListener("click", saveToStorage)
console.log(parseData);

