export default function totalCost(items) {
  const result = {};
  let subtotal = 0;
  items.forEach(item => {
    subtotal += (item.price * item.quantity);
  });
  subtotal = (subtotal / 100);
  result.subtotal = subtotal;
  result.taxes = (subtotal * 0.0775).toFixed(2);
  result.total = (subtotal + result.taxes).toLocaleString('en-US');
  result.subtotal = Number(subtotal.toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
  });
  return result;
}
