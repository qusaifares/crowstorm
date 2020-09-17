import React, { useState } from 'react';
import './Product.css';
import CurrencyFormat from 'react-currency-format';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import CustomButton from '../Buttons/CustomButton';

const { PUBLIC_URL } = process.env;

interface Props {
  match: any;
}

const Product: React.FC<Props> = ({ match }) => {
  const [arr1, setArr1] = useState([1, 2, 3, 4]);
  const [mainImg, setMainImg] = useState(1);
  const [quantityString, setQuantityString] = useState<number>(1);
  const updateQuantityString = (e: React.FocusEvent<HTMLInputElement>) => {
    if (quantityString >= 1 && quantityString % 1 === 0) return;
    if (!quantityString || quantityString < 1) return setQuantityString(1);
    if (quantityString % 1)
      return setQuantityString(Math.floor(quantityString));
  };
  return (
    <div className='product'>
      <div className='product__row product__row1'>
        <div className='product__col product__left'>
          <img
            src={`${PUBLIC_URL}/images/test/gallery-${mainImg}.jpg`}
            alt=''
            className='product__mainImg'
          />
          <div className='product__smallImgRow'>
            {arr1.map((num) => (
              <img
                onClick={() => setMainImg(num)}
                className='product__smallImg'
                src={`${PUBLIC_URL}/images/test/gallery-${num}.jpg`}
                alt=''
              />
            ))}
          </div>
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
          <input
            type='number'
            id='product__quantity'
            min={1}
            step={1}
            value={quantityString}
            onChange={(e) => setQuantityString(e.target.valueAsNumber)}
            onBlur={updateQuantityString}
          />
          {/*@ts-ignore*/}
          <CustomButton onClick={() => console.log('hello')}>
            Add to cart
          </CustomButton>
          <h3 className='product__detailsHeader'>Product Details</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            dolores dolorum ea repellat at laboriosam beatae nostrum soluta
            culpa vero.
          </p>
        </div>
      </div>
      <ProductCategory title='Related Products' right={<div></div>}>
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
