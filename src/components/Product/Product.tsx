import React, { useState } from 'react';
import './Product.css';
import CurrencyFormat from 'react-currency-format';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import LinkButton from '../LinkButton/LinkButton';

const { PUBLIC_URL } = process.env;

interface Props {
  match: any;
}

const Product: React.FC<Props> = ({ match }) => {
  const [arr1, setArr1] = useState([1, 2, 3, 4]);
  return (
    <div className='product'>
      <div className='product__row'>
        <div className='product__col product__left'>
          <img
            src={`${PUBLIC_URL}/images/test/gallery-1.jpg`}
            alt=''
            className='product__mainImg'
          />
        </div>
        <div className='product__col product__right'>
          <p>Home / T-Shirt</p>
          <h1>Red Printed T-Shirt by HRX</h1>
          <CurrencyFormat
            renderText={(value: number) => <h4>{value}</h4>}
            decimalScale={2}
            fixedDecimalScale={true}
            value={50}
            displayType={'text'}
            thousandSeparator={true}
            prefix='$'
          />
          <select id='product__sizeMenu'>
            <option>XXL</option>
            <option>XL</option>
            <option>Large</option>
            <option>Medium</option>
            <option>Small</option>
          </select>
          <LinkButton to='/product/1'>Add to cart</LinkButton>
        </div>
      </div>
      <ProductCategory>
        {arr1.map((num) => (
          <ProductCard
            title='Red Printed T-Shirt'
            image={`${PUBLIC_URL}/images/test/product-${num}.jpg`}
            price={10.9}
          />
        ))}
      </ProductCategory>
    </div>
  );
};

export default Product;
