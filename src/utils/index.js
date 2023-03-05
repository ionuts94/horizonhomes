export function formatToCurrency(ammount) {
  return ammount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}