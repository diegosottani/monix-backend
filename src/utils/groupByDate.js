export const groupByDate = (data) => {
  return data.reduce((acc, currentItem) => {
    const date = currentItem.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(currentItem);
    return acc;
  }, {});
}