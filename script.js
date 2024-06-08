const apiKey = "ff01a0df0f730b940593d2cfffe7067c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} Kmph`;

        document.querySelector(".weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weather-data").style.display = "block"; // Show the weather data
        document.getElementById("error-message").style.display = "none"; // Hide error message
    } catch (error) {
        console.error("Error fetching weather data:", error);

        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = `--<sup>°C</sup>`;
        document.querySelector(".humidity").innerHTML = `--%`;
        document.querySelector(".wind").innerHTML = `-- Kmph`;
        document.querySelector(".weather-icon").src = "images/placeholder.png";

        document.getElementById("weather-data").style.display = "none"; // Hide weather data on error
        document.getElementById("error-message").style.display = "block"; // Show error message
    }
}

document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
        checkWeather(city);
    }
});

document.getElementById("city-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = document.getElementById("city-input").value;
        if (city) {
            checkWeather(city);
        }
    }
});
