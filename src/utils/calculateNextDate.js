export const calculateNextDate = (currentDate, periodicity) => {
  const newDate = new Date(currentDate);
  switch (periodicity) {
    case 'Semanal':
      newDate.setDate(newDate.getDate() + 7);
      break;
    case 'Quinzenal':
      newDate.setDate(newDate.getDate() + 15);
      break;
    case 'Mensal':
      newDate.setMonth(newDate.getMonth() + 1);
      break;
    default:
      throw new Error('Periodicidade inválida');
  }
  return newDate;
};