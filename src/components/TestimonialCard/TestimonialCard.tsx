import React from 'react';
import './TestimonialCard.css';
import { FormatQuote } from '@material-ui/icons';
import DefaultRating from '../DefaultRating/DefaultRating';

interface Props {
  author: {
    name: string;
    image: string;
  };
  rating: number;
  text: string;
}

const TestimonialCard: React.FC<Props> = ({ author, text, rating }) => {
  return (
    <div className='testimonialCard'>
      <FormatQuote className='testimonialCard__quote' />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam saepe
        quis adipisci maxime sint beatae animi nam quasi quas nisi?
      </p>
      <div className='testimonialCard__rating'>
        <DefaultRating value={rating} />
      </div>
      <img src={author.image} alt='Person' />
      <h3>{author.name}</h3>
    </div>
  );
};

export default TestimonialCard;
