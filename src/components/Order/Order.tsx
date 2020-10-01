import React from 'react';
import { Link } from 'react-router-dom';
import { IOrderPopulated } from '../../helpers/api';
import './Order.css';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

interface Props {
  order: IOrderPopulated;
}

const Order: React.FC<Props> = ({ order }) => {
  return (
    <div className='order'>
      <div className='order__header'>
        <div className='order__id'>Order #{order._id}</div>
        <div className='order__date'>
          {moment(order.orderDate).format('MMMM Do YYYY')}
        </div>
      </div>
      <div className='order__body'>
        {order.items.map((item) => (
          <div key={item.product._id} className='order__item'>
            <img
              src={item.product.images[0]}
              alt={item.product.title}
              className='order__itemImg'
            />
            <div className='order__itemDetails'>
              <div className='order__itemDetailsTop'>
                <Link
                  to={`/product/${item.product._id}`}
                  className='order__itemTitle'
                >
                  {item.product.title}
                </Link>
              </div>
              <div className='order__itemDetailsBottom'>
                <div className='order__itemPrice'>
                  Price:{' '}
                  <CurrencyFormat
                    renderText={(value: number) => value}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={item.product.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix='$'
                  />
                </div>
                <p className='order__itemQuantity'>Qty: {item.quantity}</p>
              </div>
            </div>
            <div className='order__itemShippingDate'>
              Delivery Estimated by
              <br />
              <span>
                {moment(Date.now() + 250000000).format('D MMMM YYYY')}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='order__footer'>
        <p className='order__total'>
          Total:{' '}
          <CurrencyFormat
            renderText={(value: number) => value}
            decimalScale={2}
            fixedDecimalScale={true}
            value={order.amount / 100}
            displayType={'text'}
            thousandSeparator={true}
            prefix='$'
          />
        </p>
      </div>
    </div>
  );
};

export default Order;
