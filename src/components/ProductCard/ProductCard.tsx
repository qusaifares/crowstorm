import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

import CurrencyFormat from 'react-currency-format';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { IProduct } from '../Product/Product';

import DefaultRating from '../DefaultRating/DefaultRating';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff523b'
  },
  iconHover: {
    color: '#ff523b'
  }
})(Rating);

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className='productCard'>
      <img src={product.images[0]} alt={product.title} />

      <h4>{product.title}</h4>
      <DefaultRating
        value={product.ratingData.stars || Math.floor(Math.random() * 2 + 4)}
      />
      <CurrencyFormat
        renderText={(value: number) => <p>{value}</p>}
        decimalScale={2}
        fixedDecimalScale={true}
        value={product.price}
        displayType={'text'}
        thousandSeparator={true}
        prefix='$'
      />
    </Link>
  );
};

export default ProductCard;
