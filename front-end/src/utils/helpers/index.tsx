type datePropsType = string | number;

export const handleDateDifference = (
  start: datePropsType,
  end: datePropsType
) => {
  let updatedStart: number = new Date(start).getTime();
  let updatedEnd: number = new Date(end).getTime();

  let time = Math.abs(updatedEnd - updatedStart);
  let days = Math.ceil(time / (1000 * 60 * 60 * 24));

  if (days > 7) {
    let week = Math.floor(days / 7);
    let remainingDays = days % 7;

    let month = Math.floor(week / 4.34524);
    let remainingWeeks = Math.floor(week % 4.34524);

    let checkDay = remainingDays > 1 ? "days" : "day";
    let checkWeek = week > 1 ? "weeks" : "week";
    let checkMonth = month > 1 ? "months" : "month";
    let checkRemainingWeek = remainingWeeks > 1 ? "weeks" : "week";

    const weekResult = `${week} ${checkWeek} ${
      remainingDays > 0 && `and ${remainingDays} ${checkDay}`
    }`;
    const monthResult = `${month} ${checkMonth} ${
      remainingWeeks > 0 && `and ${remainingWeeks} ${checkRemainingWeek}`
    }`;
    let result = month > 0 ? monthResult : weekResult;
    return result;
  }

  return `${days} ${days > 1 ? "days" : "day"}`;
};

export const fileValidation = (file: string) => {
  let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;

  if (!allowedExtensions.exec(file)) {
    return false;
  }
  return true;
};
