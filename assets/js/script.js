// The base URL for your API calls should look like the following: 
// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.

var APIKey = "6be34685c16ee0bfc0d0c732f2d8ba7c";
var cityInput = $("#search-input");
var APICallGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&appid=" + APIKey;


// Displays city info
function displayCityInfo() {
    var city = cityInput.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.val() + "&appid=" + APIKey;

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                $("#today-title").text(city);
                var celsiusTemp = data.main.temp - 273.15
                $("#today-temp").text(celsiusTemp);
                $("#today-wind").text(JSON.stringify(data.wind));
                $("#today-humidity").text(JSON.stringify(data.main.humidity));
            });
    });
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    displayCityInfo();
});

// $(document).on("click", ".city", displayCityInfo);

/*
You'll want to allow your application to accept user input and store it in the variable 
that you've created. You'll also likely need to specify state and country variables in 
your API call, as multiple countries or states might have cities with the same name. For 
the purposes of this guide, you can use the city variable that you just created.
 example Endpoint:
- Please, use the endpoint api.openweathermap.org for your API calls
- Example of API call:
api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=6713f4c9ac8216e8dd524f95c07ef3a5
*/


/* LESSON 2 TASK 1

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=6713f4c9ac8216e8dd524f95c07ef3a5"

// We then created an Fetch call
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    // Create CODE HERE to Log the queryURL
console.log("Query URL: " + queryURL);

    // Create CODE HERE to log the resulting object
console.log(data);

    // Create CODE HERE to calculate the temperature (converted from Kelvin)
var celsiusTemp = data.main.temp - 273.15
console.log(celsiusTemp);
    // Create CODE HERE to transfer content to HTML
    $(".city").html("<h1>" + data.name + "Weather Details</h1>");
    $(".temp").text(celsiusTemp);
    $(".wind").text(data.wind.speed);
    $(".humidity").text(data.main.humidity);
    THE ABOVE ARE LINKING TO DIVS IN HTML

  });
  */

  /* LESSON 2 TASK 2 - JSON STRINGIFY TO BRING DATA BACK FROM SEARCH
   // This .on("click") function will trigger the Fetch Call
 $("#find-movie").on("click", function(event) {

  // Preventing the submit button from trying to submit the form
  // We're optionally using a form so the user may hit Enter to search instead of clicking the button
  event.preventDefault();

  // Here we grab the text from the input box
  var movie = $("#movie-input").val();

  // Here we construct our URL
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  // Write code between the dashes below to hit the queryURL with fetch(), then take the response data
  // and display it in the div with an id of movie-view

  // YOUR CODE GOES IN THESE DASHES. DO NOT MANUALLY EDIT THE HTML ABOVE

  // =================================================================

  // CODE GOES HERE
  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    JSON.stringify(data);
    $("#movie-view").text(JSON.stringify(data));
  })
  // =================================================================
});
*/

/* LESSON 2 TASK 3 - POSTING BUTTONS ON CLICK (ADDING TO ARRAY)
 // Initial array of movies
 var movies = ["The Matrix", "Dune", "Mr. Right", "The Lion King"];

 // Function for displaying movie data
 function renderButtons() {
  $("#buttons-view").empty();

  for (let index = 0; index < movies.length; index++) {
    // var buttonEl = $("<button>");
    // buttonEl.text(movies[index])
    $("#buttons-view").append(`<button>${movies[index]}</button>`);
  }
   // YOUR CODE GOES HERE

 }

 // This function handles events where one button is clicked
 $("#add-movie").on("click", function(event) {

  event.preventDefault();

   // YOUR CODE GOES HERE
   let textInput = $("#movie-input").val();
   movies.push(textInput);
   
   renderButtons();
  //  $("#buttons-view").append(`<button>textInput</button>`)
 });

 // Calling the renderButtons function to display the initial list of movies
 renderButtons();
 */


 /* LESSON 3 TASK 4 - POSTING BUTTONS ON CLICK (ADDING TO ARRAY)
// Initial array of movies
var movies = ["The Matrix", "Dune", "Mr. Right", "The Lion King"];

// Function for displaying movie data
function renderButtons() {

  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("movie");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

//Display Movie Info - we added need to finish + check
function displayMovieInfo() {
  
  var movie = $(this).attr("data-name");
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $("#movies-view").text(JSON.stringify(data))
});

}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // The movie from the textbox is then added to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

// Calling the renderButtons function to display the initial buttons
renderButtons();
*/

//LESSON 2 TASK 5 - POSTING BUTTONS ON CLICK (ADDING TO ARRAY);

// 