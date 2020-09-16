import React, { useState } from 'react';
import './Featured.css';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import Offer from '../Offer/Offer';

const { PUBLIC_URL } = process.env;

interface Props {}

const Featured: React.FC<Props> = () => {
  const [arr1, setArr1] = useState([1, 2, 3, 4]);
  const [arr2, setArr2] = useState([5, 6, 7, 8, 9, 10, 11, 12]);
  return (
    <div className='featured'>
      <div className='featured__row'>
        <div className='featured__col3'>
          <img src={`${PUBLIC_URL}/images/test/category-1.jpg`} alt='' />
        </div>
        <div className='featured__col3'>
          <img src={`${PUBLIC_URL}/images/test/category-2.jpg`} alt='' />
        </div>
        <div className='featured__col3'>
          <img src={`${PUBLIC_URL}/images/test/category-3.jpg`} alt='' />
        </div>
      </div>
      <ProductCategory title='Featured Products'>
        {arr1.map((num) => (
          <ProductCard
            title='Red Printed T-Shirt'
            image={`${PUBLIC_URL}/images/test/product-${num}.jpg`}
            price={10.9}
          />
        ))}
      </ProductCategory>
      <ProductCategory title='Latest Products'>
        {arr2.map((num) => (
          <ProductCard
            title='Red Printed T-Shirt'
            image={`${PUBLIC_URL}/images/test/product-${num}.jpg`}
            price={10.9}
          />
        ))}
      </ProductCategory>
      <Offer />
    </div>
  );
};

export default Featured;
