require('dotenv').config();
const URL = 'http://api.weatherapi.com/v1';

// Gawin nating async ang function
const forecast = async (latitude, longitude, callback) => {
  const apikey = process.env.WEATHER_API_KEY;
  const url = `${URL}/current.json?key=${apikey}&q=${latitude},${longitude}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      callback('Unable to find location', undefined);
    } else {
      const {
        condition: { text },
        feelslike_c,
        chance_of_rain,
        chance_of_snow,
      } = data.current;
      const messageForcast = `${text}, It is currently ${feelslike_c} degrees out. There is a ${chance_of_rain}% chance of rain.`;
      // callback(undefined, data.current);
      callback(undefined, messageForcast);
    }
  } catch (error) {
    callback('Unable to connect to weather service!', undefined);
  }
};

module.exports = forecast;
