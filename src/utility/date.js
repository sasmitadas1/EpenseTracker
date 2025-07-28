export function getFormatedDate(date) {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function getDateMinusDate(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
