
// Starter Variables
let recommendedMovie = "";
let movieID = "";

// API URL Variables
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL;

// Variable Elements from HTML
let trailerSourceEl = document.getElementById('src');
let trailerVideoEl = document.getElementById('video');
let trailerEl = document.getElementById('link-to-trailer');
let videoLink;
let recommendedTitleEl = document.getElementById("recommended-title");
// let trailerContainerEl = document.getElementById('trailer-container');

// Variables defined to show & hide HTML elements on page
let quizContainerEl = $("#quiz-container");
let trailerContainerEl= $('#link-to-trailer');
let resultsContainerEl = $("#results");
let resultsTitleEl = $("#recommended-title");


quizContainerEl.css("display", "block");
resultsContainerEl.css("display", "none");
resultsTitleEl.css("display", "none");
trailerContainerEl.css("display","none");



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
			$("#results").append("<div class='pad-8'>" + overview + "</div><hr class='hr'>");
			console.log("title" + title);
			getMovieID (title);
		}
	}

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
                movieID=data.results[0].id;
                Trailers(movieID);                
              });
            }      
        })
}



// Function to populate Trailer with movie ID
function Trailers (movieID) {
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

	// Hide the quiz questions when results are displayed
	function hideQuiz() {
		quizContainerEl.css("display", "none");
		resultsContainerEl.css("display", "block");
		resultsTitleEl.css("display", "block");
		trailerContainerEl.css("display","block");

	}

	function addRecommendedTitle (){
		// Create an h3 to replace the title at top of movie results
		let recommendedMoviesTitleEl = document.createElement("h3");
		recommendedMoviesTitleEl.setAttribute("class", "title is-size-3");
		recommendedMoviesTitleEl.textContent = "Below is a list of our Top 5 Movie Recommendations for you!";
		// Append list items to ordered trailerListEl

		 recommendedTitleEl.appendChild(recommendedMoviesTitleEl);

	}
});