import { useEffect, useState } from "react";
import { getYourCityData } from "../utils/getYourCity";

import { fetchDailyForecast } from "../utils/getYourForecast";

const ForecastDaily = () => {
  const data = JSON.parse(getYourCityData());
  const [cityForecast, setCityForecast] = useState();

  const { name } = data;
  //   fetchDailyForecast(name);
  //   console.log(name);

  //   const fetchCurrentWeather = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=7750e825906fd8d6afa1ee1dcb595e18&units=metric`
  //       );
  //       //   setActiveDay(response.data);
  //     } catch (error) {
  //       console.error("Error fetching current weather:", error);
  //     }
  //   };

  useEffect(() => {
    // fetchCurrentWeather();
    // fetchDailyForecast(name);
    const promise = fetchDailyForecast(name);
    promise.then((data) => {
      //   console.log(data);
      if (data) {
        const { forecastday } = JSON.parse(data);
        setCityForecast(forecastday);
        // console.log(forecastday);
      }
      //
    });
  }, [fetchDailyForecast, name]);

  //   useEffect(() => {
  //     if (!cityForecast) return;
  //     console.log(cityForecast);
  //   }, [cityForecast]);

  //   console.log(cityForecast);

  return (
    <div className="w-full absolute top-[120px] right-0">
      <div className="w-full h-[100px] flex justify-between items-center">
        {cityForecast &&
          cityForecast.map((item, index) => {
            const { avgtemp_c, maxtemp_c, mintemp_c } = item.day;
            console.log(avgtemp_c, maxtemp_c, mintemp_c);
            return (
              <div key={index} className="w-full text-center">
                <p>{avgtemp_c}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ForecastDaily;
