const setCurrentPath = (i, timesOfDay) => {
  if (i === 0) i++;
  if (i < 10) {
    i = `0${i}`;
    return `../assets/images/${timesOfDay}/${i}.jpg`;
  }
  return `../assets/images/${timesOfDay}/${i + 1}.jpg`;
};

// Определяем пути к изображениям
export const images = {
  morning: Array.from({ length: 20 }, (_, i) => setCurrentPath(i, "morning")),
  day: Array.from({ length: 20 }, (_, i) => setCurrentPath(i, "day")),
  evening: Array.from({ length: 20 }, (_, i) => setCurrentPath(i, "evening")),
  night: Array.from({ length: 20 }, (_, i) => setCurrentPath(i, "night")),
};

// Определяем время суток
export const getPartOfTheDay = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "day";
  if (hour >= 18 && hour < 24) return "evening";
  return "night";
};
