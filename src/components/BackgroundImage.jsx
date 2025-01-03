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
    <div className="background h-full overflow-y-hidden">
      <div
        className="w-full"
        style={{
          height: "calc(100vh - env(safe-area-inset-top))", // Высота без адресной строки
          backgroundImage: imageSrc ? `url(${imageSrc})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default BackgroundImage;
