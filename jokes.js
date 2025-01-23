const axios = require('axios');

// Your API Ninjas API Key
const API_KEY = process.env.JOKES_API_KEY
const BASE_URL = 'https://api.api-ninjas.com/v1/jokes';

async function getJoke() {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    // Log the joke from the response
    console.log('Here’s a joke for you:', response.data[0].joke);
    return `Here’s a joke for you: ${response.data[0].joke}`;
  } catch (error) {
    console.error('Error fetching joke:', error.message);
  }
}

// Fetch and display a joke
getJoke();
module.exports = getJoke;