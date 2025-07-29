export function getFormatedDate(date) {
  if (!date) return '';
  
  const parsedDate = date instanceof Date ? date : new Date(date);
  if (isNaN(parsedDate)) return '';

  return parsedDate.toISOString().slice(0, 10);
}


export function getDateMinusDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
