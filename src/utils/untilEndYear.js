export const untilEndYear = (currentDate) => {
  const MONTHS = 12;
  const currentMonth = currentDate.getMonth();
  const monthsLeft = MONTHS - currentMonth;

  return monthsLeft;
}
