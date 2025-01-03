export const checkNumber = (number) => {
  if (number > 0) {
    return `+${number}`;
  }

  return number;
};
