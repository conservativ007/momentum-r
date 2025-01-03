import axios from "axios";

const URL =
  "https://api.openweathermap.org/geo/1.0/direct?q=minsk&limit=1&appid=47f560079c502e4234c3013295d529d3";

export const getYourCityData = async () => {
  const getCityData = localStorage.getItem("city-data");
  if (getCityData) {
    console.log("get city-data from local storage");
    return JSON.parse(getCityData);
  }

  console.log("get city-data from API");
  try {
    const response = await axios.get(URL);
    const { name, lat, lon } = response.data[0];
    // console.log(name, lat, lon);

    localStorage.setItem("city-data", JSON.stringify({ name, lat, lon }));
    return { name, lat, lon };
  } catch (error) {
    console.error("Ошибка при запросе данных о городе:", error);
    throw error;
  }
};
