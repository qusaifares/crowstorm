import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { getOrders, IOrderPopulated } from '../../helpers/api';
import { useStateValue } from '../../store/StateProvider';
import LinkButton from '../Buttons/LinkButton';
import './OrderConfirmation.css';

interface Props {}

const OrderConfirmation: React.FC<Props> = () => {
  const [{ user }, dispatch] = useStateValue();
  const [lastOrder, setLastOrder] = useState<IOrderPopulated>();
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    const getLastOrder = async () => {
      try {
        const orders = await getOrders(user._id);
        if (!isMounted.current) return;
        setLastOrder(
          orders?.sort(
            (a, b) => a.orderDate?.getTime() - b.orderDate?.getTime()
          )[0]
        );
      } catch (error) {
        console.log(error);
      }
    };
    getLastOrder();
    return () => {
      isMounted.current = false;
    };
  }, [user?._id]);

  if (!user._id) return <Redirect to='/' />;

  return (
    <div className='orderConfirmation'>
      <div className='orderConfirmation__content'>
        <h1>Thank you for your order</h1>
        <p>
          <strong>Confirmation #{lastOrder?._id}</strong>
        </p>
        <LinkButton to='/orders'>View Orders</LinkButton>
      </div>
    </div>
  );
};

export default OrderConfirmation;
