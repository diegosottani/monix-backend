export const groupByDate = (data) => {
  return data.reduce((acc, currentItem) => {
    const date = currentItem.date;
    if (!acc[date]) {
      acc[date] = [];
    }

    currentItem['account'] = currentItem.account_id
    delete currentItem.account_id

    acc[date].push(currentItem);
    return acc;
  }, {});
}