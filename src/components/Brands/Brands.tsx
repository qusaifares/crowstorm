import React from 'react';
import './Brands.css';

const { PUBLIC_URL } = process.env;

interface Props {}

const Brands: React.FC<Props> = () => {
  return (
    <div className='brands'>
      <div className='brands__row'>
        <div className='brands__col'>
          <img src={`${PUBLIC_URL}/images/products/logo-godrej.png`} alt='' />
        </div>
        <div className='brands__col'>
          <img src={`${PUBLIC_URL}/images/products/logo-oppo.png`} alt='' />
        </div>
        <div className='brands__col'>
          <img
            src={`${PUBLIC_URL}/images/products/logo-coca-cola.png`}
            alt=''
          />
        </div>
        <div className='brands__col'>
          <img src={`${PUBLIC_URL}/images/products/logo-paypal.png`} alt='' />
        </div>
        <div className='brands__col'>
          <img src={`${PUBLIC_URL}/images/products/logo-philips.png`} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Brands;
