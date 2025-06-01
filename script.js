const apiKey = "1428ed2a3efdd0804b62a22e80098dbb";
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherDisplay = document.getElementById("weatherDisplay");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


async function fetchWeather(city) {

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;


        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                    throw new Error ("City not found");
            }

            const data = await response.json();
            console.log(data)
            displayWeather(data);

        } catch (error) {
            alert(error)
        }
}


function displayWeather(data) {

        const newDescription = data.weather[0].description.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

        weatherDisplay.classList.remove("hidden");
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°F`
        minTemp.textContent = `Low: ${Math.round(data.main.temp_min)}°F`
        maxTemp.textContent = `High: ${Math.round(data.main.temp_max)}°F`
        description.textContent = `Condition: ${newDescription}`
        humidity.textContent = `Humidity: ${data.main.humidity}%`
        wind.textContent = `Wind: ${data.wind.speed} mph`
        sunrise.textContent = `Sunrise: ${sunriseTime}`
        sunset.textContent = `Sunset: ${sunsetTime}`
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}


searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        const city = cityInput.value.trim();

        if (city) {
            fetchWeather(city)
            cityInput.value = "";
        }

       
});

cityInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
                e.preventDefault();

                const city = cityInput.value.trim();
                if (city) {
                        fetchWeather(city);
                        cityInput.value = "";
                }
        }

        
})


 