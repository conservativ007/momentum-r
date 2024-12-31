import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/owfont-regular.css";
import "../styles/weather.css";

const Weather = () => {
  let [temp, setTemp] = useState(0);
  let [icon, setIcon] = useState(0);
  let [cityName, setCityName] = useState("");

  let [cityData, setCityData] = useState(
    JSON.parse(localStorage.getItem("city-coordinates"))
  );

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=minsk&limit=1&appid=47f560079c502e4234c3013295d529d3`
      )
      .then((data) => {
        if (data.data.length === 0) {
          return console.warn("enter the correct city");
        }
        let { lat, lon } = data.data[0];

        setCityData({ lat, lon });
        localStorage.setItem("city-coordinates", JSON.stringify({ lat, lon }));
      });
  }, []);

  // get coords by id
  useEffect(() => {
    if (cityData === null) {
      console.log("get coords");
      axios.get("https://ipapi.co/json/").then((data) => {
        setCityData({ lat: data.data.latitude, lon: data.data.longitude });
      });
    }
  }, [cityData]);

  useEffect(() => {
    if (cityData === null) return;
    // console.log("get data");

    let { lat, lon } = cityData;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7750e825906fd8d6afa1ee1dcb595e18&units=metric`
      )
      .then((data) => {
        setTemp(Math.round(data.data.main.temp));
        setIcon(data.data.weather[0].id);
        setCityName(data.data.name);
        localStorage.setItem("city-coordinates", JSON.stringify({ lat, lon }));
      });
  }, [cityData]);

  return (
    <div className="weather">
      <div className="weather-current">
        <div className="weather-current__day">
          <i className={`owf owf-${icon}-d owf-2x`}></i>
          <div className="weather-temp">{temp}°</div>
        </div>
        <div className="weather-current__city">{cityName}</div>
      </div>
    </div>
  );
};

export default Weather;
