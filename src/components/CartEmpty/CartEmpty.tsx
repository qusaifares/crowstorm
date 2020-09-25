import React from 'react';
import LinkButton from '../Buttons/LinkButton';
import './CartEmpty.css';

import { useStateValue } from '../../store/StateProvider';
interface Props {}

const CartEmpty: React.FC<Props> = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className='cartEmpty'>
      <div className='cartEmpty__content'>
        <h1>Your Cart is Empty</h1>
        <p>
          I'm sorry{user ? ` ${user.name.first}` : null}, I'm afraid there's
          nothing here.
        </p>
        <LinkButton to='/products'>Start Shopping</LinkButton>
      </div>
    </div>
  );
};

export default CartEmpty;
