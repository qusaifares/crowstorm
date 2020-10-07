import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import './Orders.css';
import Order from '../Order/Order';
import { getOrders, IOrderPopulated } from '../../helpers/api';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userInfoSlice';
import LinkButton from '../Buttons/LinkButton';

interface Props {}

const Orders: React.FC<Props> = () => {
  const user = useSelector(selectUser);

  const [orders, setOrders] = useState<IOrderPopulated[]>([]);

  const populateOrders = async () => {
    try {
      if (!user) return;
      const ordersData = await getOrders(user._id as string);
      setOrders(ordersData || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateOrders();
    return () => {
      setOrders([]);
    };
  }, [user?.orders]);

  if (!user?._id) return <Redirect to='/register' />;

  if (!orders.length)
    return (
      <div className='orders'>
        <div className='orders__emptyContent'>
          <h1 className='orders__emptyTitle'>No Orders</h1>
          <p className='orders__emptyMessage'>You haven't made any orders.</p>
          <LinkButton to='/products'>Start Shopping</LinkButton>
        </div>
      </div>
    );

  return (
    <div className='orders'>
      <div className='orders__inner'>
        <h1 className='orders__title'>Orders</h1>
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
