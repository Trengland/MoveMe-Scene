let quizContainerEl = $("#quiz-container");

quizContainerEl.css("disiplay", "block");

$(function () {
	const apiKey = "bb20124838543378f16ab68d72df5e76";

	$("#searchBtn").click(function () {

		//build selection criteria
		var releaseDateStart = $("#release-start").val();
		var releaseDateEnd = $("#release-end").val();
		var runtimeLTE = $("#runtime").val();
		var genereIds = "";
		$("input[name='genres']:checked").each(function () {
			genereIds += $(this).val() + "|";
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
		var variables = "release_date.gte=" + releaseDateStart + "&release_date.lte=" + releaseDateEnd  + "&with_genres=" + genereIds  + "&with_runtime.lte=" + runtimeLTE + "&certification_country=US&certification=" + certString;

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
		});
	});

	function displayResults(results) {
		console.log(results);
		$("#results").empty();

		for (var i = 0; i < 5; i++) {
			var title = results.results[i].title;
			var overview = results.results[i].overview;
			var releaseDate = results.results[i].release_date;
			var poster = results.results[i].poster_path;
			var count = i + 1;

			$("#results").append("<div class='pad-8'><img src='https://image.tmdb.org/t/p/original" + poster + "' class='poster'/></div>");
			$("#results").append("<div class='pad-8'>#" + count + ": " + title + "<span class='margin-left-10 small-text'>Released: " + dayjs(releaseDate).format('MM/DD/YYYY') + "</span></div>");
			$("#results").append("<div class='pad-8'>" + overview + "</div><hr class='hr'>");
			console.log("title " + title);
			getMovieID (title);
		}

		// getMovieID (results.results[5].title);
	}


	// Hide the quiz questions when results are displayed
	function hideQuiz() {
		quizContainerEl.css("display", "none");
	}
});