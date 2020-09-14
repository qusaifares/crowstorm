import React, { useState } from 'react';
import './Featured.css';
import FeaturedCategory from '../FeaturedCategory/FeaturedCategory';
import ProductCard from '../ProductCard/ProductCard';
import Offer from '../Offer/Offer';

interface Props {}

const Featured: React.FC<Props> = () => {
  const [arr1, setArr1] = useState([1, 2, 3, 4]);
  const [arr2, setArr2] = useState([5, 6, 7, 8, 9, 10, 11, 12]);
  return (
    <div className="featured">
      <FeaturedCategory title="Featured Products">
        {arr1.map((num) => (
          <ProductCard
            title="Red Printed T-Shirt"
            image={`${process.env.PUBLIC_URL}/images/test/product-${num}.jpg`}
            price={10.9}
          />
        ))}
      </FeaturedCategory>
      <FeaturedCategory title="Latest Products">
        {arr2.map((num) => (
          <ProductCard
            title="Red Printed T-Shirt"
            image={`${process.env.PUBLIC_URL}/images/test/product-${num}.jpg`}
            price={10.9}
          />
        ))}
      </FeaturedCategory>
      <Offer />
    </div>
  );
};

export default Featured;
