import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

import CurrencyFormat from 'react-currency-format';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { StarBorder } from '@material-ui/icons';

import DefaultRating from '../DefaultRating/DefaultRating';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff523b',
  },
  iconHover: {
    color: '#ff523b',
  },
})(Rating);

interface Props {
  title: string;
  image: string;
  price: number;
}

const ProductCard: React.FC<Props> = ({ title, image, price }) => {
  return (
    <Link to="/products/1" className="productCard">
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <DefaultRating value={3} />
      <CurrencyFormat
        renderText={(value: number) => <p>{value}</p>}
        decimalScale={2}
        fixedDecimalScale={true}
        value={price}
        displayType={'text'}
        thousandSeparator={true}
        prefix="$"
      />
    </Link>
  );
};

export default ProductCard;
