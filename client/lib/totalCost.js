export default function totalCost(items) {
  const result = {};
  let subtotal = 0;
  items.forEach(item => {
    subtotal += item.price;
  });
  subtotal = subtotal / 100;
  result.subtotal = subtotal;
  result.taxes = subtotal * 0.0775;
  result.total = (subtotal + result.taxes).toLocaleString('en-US');
  result.subtotal = subtotal.toLocaleString('en-US');
  return result;
}
