import axios from "axios";

const saveDataToLocalStorage = (key, data) => {
  const timestamp = new Date().getTime();
  // console.log(timestamp);
  localStorage.setItem(key, JSON.stringify({ data, timestamp }));
};

export const getDataFromLocalStorage = (key, maxAgeMs) => {
  const item = localStorage.getItem(key);

  if (!item) return null;

  const { data, timestamp } = JSON.parse(item);

  const now = new Date().getTime();

  if (now - timestamp > maxAgeMs) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};

export const fetchDailyForecast = async (cityName) => {
  if (cityName.length === 0) return;

  const getCityForecast = getDataFromLocalStorage("city-forecast", 3600 * 1000); // 1 hour
  // console.log("getCityForecast", getCityForecast);
  if (getCityForecast) {
    console.log("Data from locale storage");
    return getCityForecast;
  }

  console.log("data from API");
  const KEY = "bf677b264ac04013a0990631242512";
  // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  // console.log("apiKey", apiKey);
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${cityName}&days=18&aqi=no&alerts=no`;

  try {
    const response = await axios.get(URL);

    const forecastData = response.data.forecast;
    saveDataToLocalStorage("city-forecast", forecastData);

    return forecastData;
  } catch (error) {
    console.error("Error fetching daily forecast:", error);
    throw new Error("Unable to fetch weather data. Please try again later.");
  }
};
