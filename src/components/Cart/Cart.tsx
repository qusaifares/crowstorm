import React from 'react';
import './Cart.css';

import CustomButtons from '../Buttons/CustomButton';

interface Props {}

const Cart: React.FC<Props> = () => {
  return (
    <div className='cart'>
      <table className='cart__table'>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        {[1, 2, 3].map((num) => (
          <tr>
            <td>
              <div className='cart__productInfo'>
                <img
                  src={`${process.env.PUBLIC_URL}/images/test/buy-${num}.jpg`}
                  alt=''
                />
                <div className='cart__productInfoText'>
                  <p>Red Printed T-Shirt</p>
                  <small>Price: $50.00</small>
                  <div className='cart__removeProduct'>Remove</div>
                </div>
              </div>
            </td>
            <td>
              <input type='number' defaultValue={1} min={1} step={1} />
            </td>
            <td>$50.00</td>
          </tr>
        ))}
      </table>
      <div className='cart__total'>
        <table className='cart__totalTable'>
          <tr>
            <td>Subtotal</td>
            <td>$150.00</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>$9.00</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>$159.00</td>
          </tr>
        </table>
      </div>
      <CustomButtons>Checkout</CustomButtons>
    </div>
  );
};

export default Cart;
