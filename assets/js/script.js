// The base URL for your API calls should look like the following: 
// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.

var APIKey = "6be34685c16ee0bfc0d0c732f2d8ba7c";
var cityInput = $("#search-input");
// var APICallGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&appid=" + APIKey + "&units=metric";

var resultsToday = $("#today")
var resultsFuture = $("#forecast")

var cities = [];

// local storage check
$(document).ready(function () {
    var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];
    
    for (let index = 0; index < searchHistory.length; index++) {
        cities.push(searchHistory[index]);
    }
    renderButtons();

    if (searchHistory.length > 0) {
        var lastSearchedCity = searchHistory[searchHistory.length - 1];
        // displayCityInfo(lastSearchedCity);
    }
});


var textInput = cityInput.val();
    // displayCityInfo(textInput)
    //     .then(function (search) {
    //         localStorage.setItem("search-history", JSON.stringify(search));
    //         console.log("Stored search history:", search);
        // })


// Displays city info
function displayCityInfo(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric";

        return fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);

                resultsToday.empty();

                // H2 for City Name
                var cityName = $("<h2>").text(data.name); //today's date needs to be added here
                //image thumbnail should be added here
                resultsToday.append(cityName);
                // P for description, temp, wind, humidity
                var todayDesc = $("<p>").text("Description: " + data.weather[0].description);
                resultsToday.append(todayDesc);
                // var fahrenheitTemp = data.main.temp;
                // var celsiusTemp = (fahrenheitTemp - 273.15);
                var todayTemp = $("<p>").text("Temperature: " + data.main.temp.toFixed(2) + "°C");
                resultsToday.append(todayTemp);
                    // var celsiusTemp = data.main.temp - 273.15
                var todayWind = $("<p>").text("Wind Speed: " + data.wind.speed + " m/s, Direction: " + data.wind.deg + "°");
                resultsToday.append(todayWind);
                var todayHumidity = $("<p>").text("Humidity: " + data.main.humidity  + "%");
                resultsToday.append(todayHumidity);
                
                // console.log(data);
                return data;
            })
            .catch(function (error) {
                console.error("Error fetching city info:", error);
                throw error;
            });
    }

// Function to add buttons to screen on submit
function renderButtons() {
 $("#history").empty();

 for (let index = 0; index < cities.length; index++) { 
   var historyButton = $("<button>");
   historyButton.addClass("btn btn-primary history-button");
   historyButton.attr("data-name", cities[index]); 
   historyButton.text(cities[index]); 
   $("#history").append(historyButton);

   $(".history-button").on("click", function(event) {
    var cityName = $(this).attr("data-name");
    displayCityInfo(cityName);
   });
 }  
}

// 5 Day Future Forecast
function futureForecast(city) {
    $("#forecast").empty();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=metric";
    
    // var lat = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + API key;
    // var long = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + API key;

    fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //want to use long/lat of city to fetch info on city
        var forecastList = data.list;
 
        console.log(forecastList);

                // H2 for 5-Day Forecast
                
                // P for description, temp, wind, humidity

    })
};

// Save event
function saveHistory(event) {
    var textInput = cityInput.val();
    displayCityInfo(textInput)
        .then(function (search) {
            localStorage.setItem("search-history", JSON.stringify(cities));
            console.log("Stored search history:", JSON.parse(localStorage.getItem("search-history")));

        })
        .catch(function (error) {
            console.log("Error fetching and saving data:", error); 
        });
}

$("#search-button").on("click", function (event) {
    event.preventDefault();
    var textInput = cityInput.val();
        if (!cities.includes(textInput)) {
        cities.push(textInput);
        }

    renderButtons();
    displayCityInfo(textInput);
    futureForecast(textInput);
    saveHistory();
});



/* DAYJS NOTES
var today = dayjs().format("dddd DD MMMM YYYY");
$("#currentDay").text(today);
*/


// Implement bootstrap - html header
// Implement bootstrap - form & search
// Implement bootstrap - cards (+ new 5 days cards)
//  README File