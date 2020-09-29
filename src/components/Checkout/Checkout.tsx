import React from 'react';
import './Checkout.css';
import { CardElement } from '@stripe/react-stripe-js';

interface Props {}

const Checkout: React.FC<Props> = () => {
  return (
    <div className='checkout'>
      <CardElement />
    </div>
  );
};

export default Checkout;
