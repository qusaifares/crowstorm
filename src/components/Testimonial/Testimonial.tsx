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
            image: `${PUBLIC_URL}/images/test/user-1.png`
          }}
          text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia qui excepturi atque exercitationem tempore minus!'
        />
        <TestimonialCard
          rating={5}
          author={{
            name: 'Sean Parker',
            image: `${PUBLIC_URL}/images/test/user-2.png`
          }}
          text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia qui excepturi atque exercitationem tempore minus!'
        />
        <TestimonialCard
          rating={5}
          author={{
            name: 'Amy Lee',
            image: `${PUBLIC_URL}/images/test/user-3.png`
          }}
          text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia qui excepturi atque exercitationem tempore minus!'
        />
      </div>
    </div>
  );
};

export default Testimonial;