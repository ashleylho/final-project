export default function subtotal(items) {
  let subtotal = 0;
  items.forEach(item => {
    return (subtotal += item.price);
  });
  subtotal = subtotal / 100;
  subtotal = subtotal.toLocaleString('en-US');
  return subtotal;
}
