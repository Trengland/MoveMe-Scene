//trending/{movie}/{week};

// variable placeholers to update
let trendingMovie = "changemelater";
let movieID = ""; 

// variables
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMBD ;

//function getMovieID (){
    fetch(idURL)
    .then(function(response){
        if (response.ok) {
            response.json().then(function (data) {
                console.log("API call was a success!");
                console.log(data.results[0].id);
                movieID=data.results[0].id;
                Trailers(movieID);                
              });
            }      
        })
    console.log(movieID)


// Function to populate trending movies with movie ID

function Trailers (movieID) {
    console.log(movieID);
    let trailerURL = "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + apiKeyTMBD + "&language=en-US";
   
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