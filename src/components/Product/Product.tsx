import React from 'react';
import './Product.css';

interface Props {
  match: any;
}

const Product: React.FC<Props> = ({ match }) => {
  return <div className='product'></div>;
};

export default Product;
