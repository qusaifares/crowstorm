import React from 'react';
import './Testimonial.css';
import TestimonialCard from '../TestimonialCard/TestimonialCard';

const { PUBLIC_URL } = process.env;

interface Props {}

const Testimonial: React.FC<Props> = () => {
  return (
    <div className='testimonial'>
      <div className='testimonial__row'>
        <TestimonialCard
          rating={4}
          author={{
            name: 'Samantha Cook',
            image: `${PUBLIC_URL}/images/products/user-1.png`
          }}
          text='Great service, Great clothes and FAST delivery!! Loved the dress, now buying more! Happy! Happy!
          '
        />
        <TestimonialCard
          rating={5}
          author={{
            name: 'Sean Parker',
            image: `${PUBLIC_URL}/images/products/user-2.png`
          }}
          text='I am very happy with the products I received, that came very quickly and everyone that I got them for loved them.'
        />
        <TestimonialCard
          rating={5}
          author={{
            name: 'Amy Lee',
            image: `${PUBLIC_URL}/images/products/user-3.png`
          }}
          text='I absolutely adore the trendy styles this store offers. The clothes fit so well and they look amazing!'
        />
      </div>
    </div>
  );
};

export default Testimonial;
