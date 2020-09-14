import React from 'react';
import './Offer.css';

import LinkButton from '../LinkButton/LinkButton';

interface Props {}

const Offer: React.FC<Props> = () => {
  return (
    <section className='offer'>
      <div className='offer__container'>
        <div className='offer__col offer__left'>
          <img
            src={`${process.env.PUBLIC_URL}/images/test/exclusive.png`}
            alt='Offer'
            className='offer__img'
          />
        </div>
        <div className='offer__col offer__right'>
          <p>Exclusively Available at Crowstorm</p>
          <h1>Smart Band 4</h1>
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            delectus numquam facere commodi deleniti! Recusandae voluptatem
            molestias in optio quae.
          </small>
          <LinkButton to='/' className='offer__btn'>
            Buy Now
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default Offer;
