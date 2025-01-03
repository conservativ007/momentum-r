import { useEffect, useState } from "react";

import { getYourCityData } from "../utils/getYourCity";
import { fetchDailyForecast } from "../utils/getYourForecast";

import "../styles/weather.css";

import { Loader } from "lucide-react";
import { checkNumber } from "../utils/checkNumber";

const WeatherForCurrentDay = () => {
  let [cityData, setCityData] = useState(null);
  let [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    const fetchCityData = async () => {
      try {
        // get coordinates of your city, name of city
        const data = await getYourCityData();
        // get daily forecast of your city
        const dailyForecast = await fetchDailyForecast(data.name);

        let correctMaxtemp_c = checkNumber(
          Math.round(dailyForecast.forecastday[0].day.avgtemp_c)
        );

        setCityData({
          name: data.name,
          avgtemp_c: correctMaxtemp_c,
          condition: dailyForecast.forecastday[0].day.condition.icon,
        });

        setLoader(false);
      } catch (error) {
        console.error("Ошибка при получении данных о городе:", error);
      }
    };

    const timeoutID = setTimeout(fetchCityData, 500);

    return () => clearTimeout(timeoutID);
  }, []);

  return loader ? (
    <p
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="absolute pb-2 px-4 rounded-bl-[10px] flex flex-col justify-center items-center top-0 right-0 text-white"
    >
      <Loader />
    </p>
  ) : (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      className="absolute pb-2 px-4 rounded-bl-[10px] flex flex-col justify-center items-center top-0 right-0 text-white"
    >
      <img
        src={`https:${cityData && cityData.condition}`}
        alt="Weather Icon"
        className="w-10 h-10"
      />

      <p>{cityData && cityData.avgtemp_c}</p>
      <p>{cityData && cityData.name}</p>
    </div>
  );
};

export default WeatherForCurrentDay;
