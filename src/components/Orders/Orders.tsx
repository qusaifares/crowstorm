import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../store/StateProvider';
import './Orders.css';
import Order from '../Order/Order';
import { getOrders, IOrderPopulated } from '../../helpers/api';

interface Props {}

const Orders: React.FC<Props> = () => {
  const [{ user }, dispatch] = useStateValue();

  const [orders, setOrders] = useState<IOrderPopulated[]>([]);

  const populateOrders = async () => {
    try {
      if (!user) return;
      const ordersData = await getOrders(user._id);
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
