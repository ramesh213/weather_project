
const apiKey = "a2e6160a6f50608186f4eb5dd3065711";
console.log(apiKey);
const weatherData = document.getElementById("weather-details");

const cityInput = document.getElementById("city");

const formData = document.querySelector("form");

formData.addEventListener("submit", (event) =>{
    event.preventDefault();
    const cityValue  = cityInput.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if(!response.ok) {
            throw new Error("Network response failed");
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const weatherImage = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ]

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherImage}.png" alt="weather image">`

        weatherData.querySelector(
              ".temperature").textContent = `${temperature}°C`;

        weatherData.querySelector(
                ".description").textContent = description;

        weatherData.querySelector(
                    ".details").innerHTML = details.map((details) =>
                   `<div>${details}</div>` ).join("");
        
    } 
    catch (error) {
        weatherData.querySelector(".icon").innerHTML =""; 
        weatherData.querySelector(".temperature").textContent = "";
        weatherData.querySelector(".description").textContent ="Location not found, Please spell correctly !";
        weatherData.querySelector(".details").innerHTML ="";
    }
}