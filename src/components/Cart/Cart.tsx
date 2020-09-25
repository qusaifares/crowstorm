import React, { useState, useEffect } from 'react';
import './Cart.css';
import CurrencyFormat from 'react-currency-format';

import CustomButtons from '../Buttons/CustomButton';
import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';
import { IProduct } from '../Product/Product';
import CartEmpty from '../CartEmpty/CartEmpty';

interface Props {}

export interface CartItem {
  productId?: string;
  product: IProduct;
  quantity: number;
}

const Cart: React.FC<Props> = () => {
  const [{ cart, user }, dispatch] = useStateValue();
  const taxRate = 0.07;
  const [subtotal, setSubtotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const removeItem = (i: number) => {
    let tempCart = cart;
    tempCart.splice(i, 1);
    dispatch({
      type: ActionType.UPDATE_CART,
      cart: tempCart
    });
    updateTotal();
  };

  const updateTotal = () => {
    const sum = (cart as CartItem[]).reduce(
      (a, v) => a + v.product.price * v.quantity,
      0
    );
    setSubtotal(sum);
    setTax(sum * taxRate);
    setTotal(sum + sum * taxRate);
  };

  useEffect(() => {
    updateTotal();
    return () => {
      setSubtotal(0);
      setTax(0);
      setTotal(0);
    };
  }, [cart]);

  if (!cart.length) return <CartEmpty />;

  return (
    <div className='cart'>
      <table className='cart__table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {(cart as CartItem[]).map((item, i) => (
            <tr key={item.product._id}>
              <td>
                <div className='cart__productInfo'>
                  <img src={item.product.images[0]} alt={item.product.title} />
                  <div className='cart__productInfoText'>
                    <p>{item.product.title}</p>{' '}
                    <CurrencyFormat
                      renderText={(value: number) => (
                        <small>Price: {value}</small>
                      )}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={item.product.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix='$'
                    />
                    <div
                      onClick={() => removeItem(i)}
                      className='cart__removeProduct'
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.quantity}</td>
              <td>
                <CurrencyFormat
                  renderText={(value: number) => value}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={item.product.price * item.quantity}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='$'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='cart__total'>
        <table className='cart__totalTable'>
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>
                <CurrencyFormat
                  renderText={(value: number) => value}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={subtotal}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='$'
                />
              </td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>
                <CurrencyFormat
                  renderText={(value: number) => value}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={tax}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='$'
                />
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>
                <CurrencyFormat
                  renderText={(value: number) => value}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={total}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='$'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <CustomButtons>Checkout</CustomButtons>
    </div>
  );
};

export default Cart;
