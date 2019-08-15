/*
Takes any type of phone number and turns it into +19785012350 format
*/
export const purePhone = (value: string) => {
  let num = value.replace(/[^\d]/g, ""); // remove all decorative chars
  num = num.length > 10 ? (num = `+${num}`) : (num = `+1${num}`); // normalize country code
  return num;
};

/*
Takes any type of phone number and turns it into +1 (978) 501-2350 format
*/
export const displayPhone = (value: string, previousValue?: string) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, "");
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return "(" + onlyNums + ") ";
    }
    if (onlyNums.length === 6) {
      return "(" + onlyNums.slice(0, 3) + ") " + onlyNums.slice(3) + "-";
    }
  }
  if (onlyNums.length <= 3) {
    return `(${onlyNums}`;
  }
  if (onlyNums.length <= 6) {
    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3)}`;
  }
  return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)}-${onlyNums.slice(
    6,
    10
  )}`;
};
