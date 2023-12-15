// The base URL for your API calls should look like the following: 
// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.

var APIKey = "6be34685c16ee0bfc0d0c732f2d8ba7c";
var cityInput = $("#search-input");
var APICallGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&appid=" + APIKey;

var resultsToday = $("#today")

// Function to add buttons to screen on submit
var cities = ["London", "Bogota", "New York", "Seoul"];

function renderButtons() {
 $("#history").empty();

 for (let index = 0; index < cities.length; index++) { 
   var historyButton = $("<button>");
   historyButton.addClass("history-button");
   historyButton.attr("data-name", cities[index]); 
   historyButton.text(cities[index]); 
   $("#history").append(historyButton);
  
   console.log(cities);
  $("#list-group").append(`<button>${cities[index]}</button>`);
};

$("#search-button").on("click", function (event) {
    event.preventDefault();
    var textInput = $(cityInput).val();
    cities.push(textInput);
    renderButtons();
    displayCityInfo();
});
 }

// Displays city info
function displayCityInfo() {
    var city = cityInput.val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    $("#search-button").on("click", function (event) {
        event.preventDefault();

        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                // H2 for City Name
                var city = $("<h2>").text(data.name);
                resultsToday.append(city);

                // P for description, temp, wind, humidity
                var todayDesc = $("<p>").text("Description: " + JSON.stringify(data.weather[0]));
                resultsToday.append(todayDesc);

                var todayTemp = $("<p>").text("Temperature: " + JSON.stringify(data.main.temp) + "c");
                resultsToday.append(todayTemp);
                    // var celsiusTemp = data.main.temp - 273.15

                var todayWind = $("<p>").text("Wind: " + JSON.stringify(data.wind));
                resultsToday.append(todayWind);

                var todayHumidity = $("<p>").text("Humidity: " + JSON.stringify(data.main.humidity));
                resultsToday.append(todayHumidity);
            });
    });
}