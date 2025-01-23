const axios = require('axios');
require('dotenv').config();

// Your WeatherAPI key and endpoint
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

async function getWind(location) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: location,
      },
    });

    const data = response.data; // Make sure this is within the try block
    const windSpeed = `The current wind speed is ${data.current.wind_kph}k/h`;
    const conditionIcon = `https:${data.current.condition.icon}`; // Ensure the icon URL is correct
    return { windSpeed, conditionIcon };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return { windSpeed: 'Error fetching data', conditionIcon: null };
  }
}

async function getRain(location) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: location,
      },
    });

    const data = response.data;
    const rain = `The current rainfall is ${data.current.precip_mm}mm`;
    return rain;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return 'Error fetching data';
  }
}

// Export the functions
module.exports = { getWind, getRain };
