export const getDayOfWeek = (timestamp) => {
  const date = new Date(timestamp);
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[date.getUTCDay()];
};
