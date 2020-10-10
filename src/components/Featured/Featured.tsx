import React, { useState, useEffect, useRef } from 'react';
import './Featured.css';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import Offer from '../Offer/Offer';
import { IProduct } from '../Product/Product';

const { PUBLIC_URL, REACT_APP_SERVER_URL } = process.env;

interface Props {}

const Featured: React.FC<Props> = () => {
  const [featured, setFeatured] = useState<IProduct[]>([]);
  const [latest, setLatest] = useState<IProduct[]>([]);
  const isMounted = useRef(false);

  const getFeatured = async () => {
    try {
      const res = await fetch(`${REACT_APP_SERVER_URL}/products?limit=4`);
      const data: IProduct[] = await res.json();
      if (isMounted.current) {
        setFeatured(data);
        setLatest(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    getFeatured();
    return () => {
      isMounted.current = false;
      setFeatured([]);
      setLatest([]);
    };
  }, []);

  return (
    <div className='featured'>
      <div className='featured__row'>
        <div className='featured__col3'>
          <img src={`${PUBLIC_URL}/images/products/category-1.jpg`} alt='' />
        </div>
        <div className='featured__col3'>
          <img src={`${PUBLIC_URL}/images/products/category-2.jpg`} alt='' />
        </div>
        <div className='featured__col3'>
          <img src={`${PUBLIC_URL}/images/products/category-3.jpg`} alt='' />
        </div>
      </div>
      <ProductCategory id='featured' title='Featured Products'>
        {featured.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </ProductCategory>
      {/* <ProductCategory title='Latest Products'>
        {featured.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </ProductCategory> */}
      <Offer />
    </div>
  );
};

export default Featured;
