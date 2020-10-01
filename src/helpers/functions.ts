import { CartItem } from './../components/Cart/Cart';
export interface Totals {
  subtotal: number;
  tax: number;
  total: number;
}
export const getCartTotals = (
  cartDetails: CartItem[],
  taxRate: number
): Totals => {
  const subtotal =
    Math.round(
      cartDetails?.reduce((a, v) => a + v.product.price * v.quantity, 0)
    ) || 0;
  const tax = Math.round(subtotal * taxRate * 100) / 100; // to 2 decimal places
  const total = Math.round(subtotal + tax);
  return { subtotal, tax, total };
};
