import React from 'react';
import './Offer.css';

import LinkButton from '../Buttons/LinkButton';

interface Props {}

const Offer: React.FC<Props> = () => {
  return (
    <section className='offer'>
      <div className='offer__container'>
        <div className='offer__col offer__left'>
          <img
            src={`${process.env.PUBLIC_URL}/images/products/exclusive.png`}
            alt='Offer'
            className='offer__img'
          />
        </div>
        <div className='offer__col offer__right'>
          <p>Exclusively Available at Crowstorm</p>
          <h1>Smart Band 4</h1>
          <small>
            Get fit and stay healthy with the Smart Band 4. This fitness tracker
            provides you with a variety of fitness and health tracking options,
            as well as practical functionality.
          </small>
          <LinkButton
            to='/product/5f6be7647044365c274f2a60'
            className='offer__btn'
          >
            Buy Now
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default Offer;
