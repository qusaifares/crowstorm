import React from 'react';
import './OrderTotals.css';
import CurrencyFormat from 'react-currency-format';

interface Props {
  subtotal?: number;
  tax?: number;
  total: number;
}

const OrderTotals: React.FC<Props> = ({ subtotal, tax, total }) => {
  return (
    <table className='orderTotals'>
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
  );
};

export default OrderTotals;
