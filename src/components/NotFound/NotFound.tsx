import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

import LinkButton from '../Buttons/LinkButton';

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <div className='notFound'>
      <div className='notFound__content'>
        <h1>
          Error <span>404</span>
        </h1>
        <h2>Oops! Nothing was found</h2>
        <p>
          It's looking like you may have taken a wrong turn. Don't worry... It
          happens to the best of us.
        </p>
        <LinkButton to='/'>Back Home!</LinkButton>
      </div>
    </div>
  );
};

export default NotFound;
