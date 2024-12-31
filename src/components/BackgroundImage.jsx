import { useEffect, useState } from "react";
import { getPartOfTheDay, images } from "../utils/timeUtils";

const BackgroundImage = () => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const partOfTheDay = getPartOfTheDay();
    const imagesArray = images[partOfTheDay];
    const intervalTime = (6 * 60 * 60 * 1000) / imagesArray.length;

    let currentIndex = 0;

    const updateImage = () => {
      setImageSrc(imagesArray[currentIndex]);
      currentIndex = (currentIndex + 1) % imagesArray.length;
    };

    updateImage();

    const timerId = setInterval(updateImage, intervalTime);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="background h-full">
      <div
        className="background-image h-[100vh] w-full"
        style={{
          backgroundImage: imageSrc ? `url(${imageSrc})` : "none", // Устанавливаем фон, если изображение загружено
        }}
      ></div>
    </div>
  );
};

export default BackgroundImage;
