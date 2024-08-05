export function formatCurrency(num: number, to = 2, currency = "BD") {
  let newNum = num?.toFixed(to);
  switch (currency) {
    case "USD":
      return `$${newNum}`;
    default:
      return `${newNum} BD`;
  }
}
