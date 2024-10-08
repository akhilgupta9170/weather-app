const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const submitBtn = document.getElementById('submitBtn');
const weatherContainer = document.getElementById('weatherContainer');
const loader = document.getElementById('loader');


loader.style.display = 'none';

submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    getWeather(city);
});

let getWeather = async (city) => {
    try {
        
        loader.style.display = 'block';
        weatherContainer.innerHTML = '';

        const response = await fetch(`https://api.weatherstack.com/current?access_key=1f871f0982c354628de5075ebb05c17b&query=${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data =====>", data);
        displayWeather(data);
        cityInput.value = '';

    } catch (error) {
        console.error('Error:', error);
        alert('Error fetching weather data. Please try again.');
    } finally {
        
        loader.style.display = 'none';
    }
}

let appendChild = (element) => weatherContainer.appendChild(element);

let createElement = (name, value) => {
    if (name === 'img') {
        const img = document.createElement('img');
        img.src = value;
        return img;
    }
    const element = document.createElement(name);
    const elementValue = value ?? "Not Available";
    element.textContent = elementValue;
    return element;
}

function displayWeather(data) {
    try {
        weatherContainer.innerHTML = '';
        const cityName = createElement('h2', data.location.name);
        appendChild(cityName);
        const countryName = createElement('p', data.location.country);
        appendChild(countryName);
        const temperature = createElement('p', `Temperature: ${data.current.temperature}°C`);
        appendChild(temperature);
        const weatherDescription = createElement('p', `Weather: ${data.current.weather_descriptions[0]}`);
        appendChild(weatherDescription);
        const humidity = createElement('p', `Humidity: ${data.current.humidity}%`);
        appendChild(humidity);
        const windSpeed = createElement('p', `Wind Speed: ${data.current.wind_speed} km/h`);
        appendChild(windSpeed);
        const windDirection = createElement('p', `Wind Direction: ${data.current.wind_dir}`);
        appendChild(windDirection);
        const weatherIcon = createElement('img', data.current.weather_icons[0]);
        appendChild(weatherIcon);
    }
    catch (error) {
        const message = createElement('span', `Error: ${error.message}`);
        appendChild(message);
    }
}
