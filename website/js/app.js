// function to handle the loading screen for the website
window.onload = () => {
    document.querySelector('.loading').style.display = 'none';
};

// /* Global Variables */
fullData = {};

const feelings = document.getElementById("feelings");
const generateButton = document.getElementById("generate");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");


// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=f2aa883b9efae6562e4a8749740fb2ba"; // Free APIKEY for the openwather API

// const apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip="; // zip code
const apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


// Create a new date instance dynamically with JS
let dateFormat = new Date();
console.log(`today date is ${dateFormat.toLocaleDateString()}`);



// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click", getWeatherAPI);

/* Function called by event listener */
function getWeatherAPI() {
    const cityName = document.getElementById("cityname").value;
    console.log(`city name  is : ${cityName}`);
    console.log("acquiring information from openweathermap");
    OpenWeatherMapAPI(apiBaseUrl, cityName, apiKey).then(response => {
        if (response.cod == 200) {
            fullData = {
                country: response.sys.country,
                city: response.name,
                temp: response.main.temp,
                icon: response.weather[0].icon,
                date: dateFormat.toLocaleDateString(),
                content: feelings.value
            };
            console.log("Full Data object");
            console.log(fullData);
            console.log("Saving weather data to the local server");
            serverSaveWeatherData('/saveWeatherData', fullData);
            console.log("Reading weather data to the local server");
            serverGetWeatherData('/getWeatherData');
        } else {
            alert(response.message);
        }
    });



}

/* Function to GET Web API Data*/
async function OpenWeatherMapAPI(apiBaseUrl, cityName, apiKey) {
    const response = await fetch(apiBaseUrl + cityName + apiKey);
    const data = await response.json();
    console.log(data);
    return data;
}



/* Function to POST data */
async function serverSaveWeatherData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;

}

/* Function to GET Project Data */
async function serverGetWeatherData() {
    const response = await fetch('/getWeatherData');
    const weatherData = await response.json();
    console.log(weatherData);
    updateGUI(weatherData);
    return weatherData;

}

/* Funciont to update GUI */
function updateGUI(weatherData) {

    date.innerHTML = weatherData.date;
    temp.innerHTML = `Temp: ${weatherData.temp} &deg`;
    content.innerHTML = weatherData.content;
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${weatherData.city})`;
    document.getElementById("tempIcon").src = `http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`;
    document.getElementById("countryFlag").src = `https://www.countryflags.io/${weatherData.country}/flat/64.png`;
    document.getElementById("city").innerHTML = weatherData.city;
    document.querySelector(".entry").style.display = "flex";
    document.querySelector(".entry").scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });


}