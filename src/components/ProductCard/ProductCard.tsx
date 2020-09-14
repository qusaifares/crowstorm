import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

import CurrencyFormat from 'react-currency-format';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { StarBorder } from '@material-ui/icons';

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
    <Link to="/" className="productCard">
      <img src={image} alt="" />
      <h4>{title}</h4>
      <StyledRating
        name="customized-color"
        value={2.3}
        getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
        precision={0.5}
        emptyIcon={
          <StarBorder
            className="productCard__ratingStar"
            style={{ color: '#ff523b' }}
            fontSize="inherit"
          />
        }
        readOnly
      />
      <CurrencyFormat
        renderText={(value: number) => <p>{value}</p>}
        decimalScale={2}
        fixedDecimalScale={true}
        value={12.9}
        displayType={'text'}
        thousandSeparator={true}
        prefix="$"
      />
    </Link>
  );
};

export default ProductCard;
