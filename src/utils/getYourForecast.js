import axios from "axios";

export const fetchDailyForecast = async (cityName) => {
  if (cityName.length === 0) return;

  const getCityForecast = localStorage.getItem("city-forecast");
  if (getCityForecast !== null) {
    console.log("data from locale storage");
    // console.log(getCityForecast);
    return JSON.parse(getCityForecast);
  }

  console.log("data from API");
  const KEY = "bf677b264ac04013a0990631242512";
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${cityName}&days=18&aqi=no&alerts=no`;

  try {
    const response = await axios.get(URL);

    const forecastData = response.data.forecast;

    localStorage.setItem("city-forecast", JSON.stringify(forecastData));

    // console.log(response);

    return forecastData;
    // console.log(response);
    // setDays(response.data.daily);
  } catch (error) {
    console.error("Error fetching daily forecast:", error);
  }
};
