// The base URL for your API calls should look like the following: 
// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`.

var APIKey = "6be34685c16ee0bfc0d0c732f2d8ba7c";
var cityInput = $("#search-input");
// var APICallGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&appid=" + APIKey + "&units=metric";

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
        displayCityInfo(lastSearchedCity);
        futureForecast(lastSearchedCity);
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
    
    $("#today").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric";
        return fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);

            var todayContainer = $("#today")

            var todayContainerCard = $("<div>").addClass("card today-card").appendTo(todayContainer);
            var cardBody = $("<div>").addClass("card-body").appendTo(todayContainerCard);

            $("<h2>").text(data.name).appendTo(cardBody); //today's date needs to be added here
            $("<h5>").text(dayjs(data.dt_txt).format("dddd, MMMM D")).addClass("date").appendTo(cardBody);
            var iconURL = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            $("<img>").attr("src", iconURL).addClass("card-img-top today-card-image").appendTo(cardBody);
            $("<p>").text("Description: " + data.weather[0].description).appendTo(cardBody);
            $("<p>").text("Temperature: " + data.main.temp.toFixed(2) + "°C").appendTo(cardBody);
            $("<p>").text("Wind: " + data.wind.speed + "m/s, Direction: " + data.wind.deg + "°").appendTo(cardBody);
            $("<p>").text("Humidity: " + data.main.humidity + "%").appendTo(cardBody)
                // // H2 for City Name
                // cityNameElement.text(data.name); 
                // //image thumbnail should be added here
                // resultsToday.append(cityName);
                // // P for description, temp, wind, humidity
                // todayDescElement.text("Description: " + data.weather[0].description);
                // // resultsToday.append(todayDesc);
                // // var fahrenheitTemp = data.main.temp;
                // // var celsiusTemp = (fahrenheitTemp - 273.15);
                // todayTempElement.text("Temperature: " + data.main.temp.toFixed(2) + "°C");
                // // resultsToday.append(todayTemp);
                //     // var celsiusTemp = data.main.temp - 273.15
                // todayWindElement.text("Wind Speed: " + data.wind.speed + " m/s, Direction: " + data.wind.deg + "°");
                // // resultsToday.append(todayWind);
                // todayHumidityElement.text("Humidity: " + data.main.humidity  + "%");
                // // resultsToday.append(todayHumidity);
                
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
 }

   $(".history-button").on("click", function(event) {
    var cityName = $(this).attr("data-name");
    displayCityInfo(cityName);
    futureForecast(cityName);
   });
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

        var forecastContainer = $("#forecast");

        for (var i = 0; i < 5; i++) {
            var dayData = data.list[i * 8];
            
            var card = $("<div>").addClass("card forecast-card").appendTo(forecastContainer);
            var cardBody = $("<div>").addClass("card-body").appendTo(card);

            $("<h5>").text(dayjs(dayData.dt_txt).format("dddd, MMMM D")).addClass("date").appendTo(cardBody);
            var iconURL = "http://openweathermap.org/img/wn/" + dayData.weather[0].icon + ".png";
            $("<img>").attr("src", iconURL).addClass("card-img-top forecast-card-image").appendTo(cardBody);
            $("<p>").text("Description: " + dayData.weather[0].description).appendTo(cardBody);
            $("<p>").text("Temperature: " + dayData.main.temp.toFixed(2) + "°C").appendTo(cardBody);
            $("<p>").text("Wind: " + dayData.wind.speed + "m/s, Direction: " + dayData.wind.deg + "°").appendTo(cardBody);
            $("<p>").text("Humidity: " + dayData.main.humidity + "%").appendTo(cardBody);
        }

        return data;
        });
    }

// Save event
function saveHistory(event) {
    localStorage.setItem("search-history", JSON.stringify(cities));
}

//     var textInput = cityInput.val();
//     displayCityInfo(textInput)
//         .then(function (search) {
//             localStorage.setItem("search-history", JSON.stringify(cities));
//             console.log("Stored search history:", JSON.parse(localStorage.getItem("search-history")));

//         })
//         .catch(function (error) {
//             console.log("Error fetching and saving data:", error); 
//         });
// }

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
//  README File