import axios from "axios";

const URL =
  "https://api.openweathermap.org/geo/1.0/direct?q=minsk&limit=1&appid=47f560079c502e4234c3013295d529d3";

export const getCityCoordinatesFromLS = JSON.parse(
  localStorage.getItem("city-coordinates")
);

export const getYourCityData = () => {
  const getCityData = localStorage.getItem("city-data");
  if (getCityData !== null) return getCityData;

  try {
    // axios.get("https://ipapi.co/json/").then((data) => {
    axios.get(URL).then((data) => {
      const { name, lat, lon } = data.data[0];

      localStorage.setItem("city-data", JSON.stringify({ name, lat, lon }));
      return JSON.stringify({ name, lat, lon });
    });
  } catch (error) {
    console.log("figetYourCityData wrongrst", error);
  }
};
