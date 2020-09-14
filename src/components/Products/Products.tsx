import React, { useState } from 'react';
import './Products.css';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';

interface Props {}

const Products: React.FC<Props> = () => {
  const [arr2, setArr2] = useState([5, 6, 7, 8, 9, 10, 11, 12]);
  return (
    <div className='products'>
      <ProductCategory
        title='All Products'
        right={<input placeholder='Search products' />}
      >
        {arr2.map((num) => (
          <ProductCard
            title='Red Printed T-Shirt'
            image={`${process.env.PUBLIC_URL}/images/test/product-${num}.jpg`}
            price={10.9}
          />
        ))}
      </ProductCategory>
    </div>
  );
};

export default Products;
