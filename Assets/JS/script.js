





























// CL - Variables
let recommendedMovie = "Grease";
let apiKeyTMBD = "87ceec9af92ce89acfb2e11778f0841f";
let idURL= "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyTMBD + "&language=en-US&query=" + recommendedMovie + "&page=1&include_adult=false";

let trailerURL = 'https://api.themoviedb.org/4/list/1?api_key=' + apiKeyTMBD;

// "https://api.themoviedb.org/3/movie/" + movie_id + "/videos?api_key=" + apiKeyTMBD + "&language=en-US"'


// CL & SS - Function to call GET Search Movies to get Movie ID
function getMovie (){
    fetch(idURL)
    .then(function(response){
        if (response.ok) {
            // need to look at other examples to make sure the .then below is correct as instructor said this isn't happening
            response.json().then(function (data) {
                console.log("API call was a success!");
                console.log(data);
                // let variableID = ;
              });
            }      
        })
    


    
    Trailers();
}

getMovie();

// CL - Function to call Trailers API
// Function to
function Trailers () {
    fetch(trailerURL)
    .then(function(response){
            if (response.ok) {
                // need to look at other examples to make sure the .then below is correct as instructor said this isn't happening
                response.json().then(function (data) {
                    console.log(data);
                  });
            }
            else {
                console.log('IMBD API call not working');
            }
        }
    )}

    Trailers();

