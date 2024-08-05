export function calcalateTotal(arr: any[]) {
  let total = 0;
  arr.forEach((item) => (total += item.price * item.cartQuantity));
  return total;
}
