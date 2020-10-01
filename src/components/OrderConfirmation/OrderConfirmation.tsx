import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { getOrder, getOrders, IOrderPopulated } from '../../helpers/api';
import { useStateValue } from '../../store/StateProvider';
import LinkButton from '../Buttons/LinkButton';
import './OrderConfirmation.css';

interface Props {
  match: any;
}

const OrderConfirmation: React.FC<Props> = ({ match }) => {
  const [{ user }, dispatch] = useStateValue();
  const [order, setOrder] = useState<IOrderPopulated>();
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    const populateOrder = async () => {
      try {
        const orderData = await getOrder(match.params.orderId);
        setOrder(orderData);
      } catch (error) {
        console.log(error);
      }
    };
    populateOrder();
    return () => {
      isMounted.current = false;
    };
  }, [match?.params?.orderId]);

  if (!user?._id) return <Redirect to='/' />;

  return order?._id ? (
    <div className='orderConfirmation'>
      <div className='orderConfirmation__content'>
        <h1>Thank you for your order</h1>
        <p>
          <strong>Confirmation #{order?._id}</strong>
        </p>
        <LinkButton to='/orders'>View Orders</LinkButton>
      </div>
    </div>
  ) : (
    <div className='orderConfirmation'></div>
  );
};

export default OrderConfirmation;
