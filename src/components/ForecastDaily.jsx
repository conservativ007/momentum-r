import { useEffect, useState } from "react";
import { getYourCityData } from "../utils/getYourCity";

import { fetchDailyForecast } from "../utils/getYourForecast";
import { getDayOfWeek } from "../utils/getDayOfWeek";
import { checkNumber } from "../utils/checkNumber";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const ForecastDaily = () => {
  const [cityForecast, setCityForecast] = useState();

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        // get coordinates of your city, name of city
        const data = await getYourCityData();
        // get daily forecast of your city
        const dailyForecast = await fetchDailyForecast(data.name);
        setCityForecast(dailyForecast.forecastday);
      } catch (error) {
        console.error("Ошибка при получении данных о городе:", error);
      }
    };

    fetchCityData();
  }, []);

  if (!cityForecast) {
    return (
      <div className="w-full absolute top-[120px] right-0">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="w-full absolute top-[120px] right-0 text-white">
      <Swiper
        spaceBetween={2}
        centeredSlides={true}
        autoHeight={false}
        // slidesPerView={4.5}
        loop={true}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 5,
            spaceBetween: 4,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 7,
            spaceBetween: 4,
          },
          1023: {
            slidesPerView: 10,
            spaceBetween: 4,
          },
          1399: {
            slidesPerView: 15,
            spaceBetween: 4,
          },
        }}
        // className="swiperFull cursor-default overflow-hidden !py-2"
        className="w-full h-full"
        speed={800}
      >
        {cityForecast.map((item, index) => {
          const { avgtemp_c, maxtemp_c, mintemp_c } = item.day;
          const { date } = item;
          const dayOfWeek = getDayOfWeek(date);

          let dayOfTheMonth = item.date.slice(-5);
          dayOfTheMonth = dayOfTheMonth.replace("-", ".");

          let correctMaxtemp_c = checkNumber(Math.round(maxtemp_c));
          let correctMintemp_c = checkNumber(Math.round(mintemp_c));

          const { icon } = item.day.condition;

          return (
            <SwiperSlide key={index}>
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                className="lg:max-w-[70px] w-full px-1 py-[2px] flex flex-col items-center text-center bg-black text-white border border-white rounded-[10px]"
              >
                <p className="text-[14px]">{dayOfTheMonth}</p>
                <p>{dayOfWeek}</p>
                <img
                  src={`https:${icon}`}
                  alt="Weather Icon"
                  className="w-10 h-10"
                />
                {/* <p>{avgtemp_c}</p> */}
                <div className="w-full flex justify-center space-x-2">
                  <p>{correctMaxtemp_c}</p>
                  <p>{correctMintemp_c}</p>
                </div>
              </div>
            </SwiperSlide>
            // <SwiperSlide key={index}>Slide 1</SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ForecastDaily;
