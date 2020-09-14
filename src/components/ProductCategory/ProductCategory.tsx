import React from 'react';
import './ProductCategory.css';

interface Props {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}

const ProductCategory: React.FC<Props> = ({ title, left, right, children }) => {
  return (
    <div className='productCategory'>
      {left || right ? (
        <div className='productCategory__header'>
          {left && <div className='productCategory__headerLeft'>{left}</div>}
          <div className='productCategory__headerCenter'>
            <h2>{title}</h2>
          </div>
          {right && <div className='productCategory__headerRight'>{right}</div>}
        </div>
      ) : (
        <h2>{title}</h2>
      )}

      <div className='productCategory__products'>{children}</div>
    </div>
  );
};

export default ProductCategory;
