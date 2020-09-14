import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import LinkButton from '../LinkButton/LinkButton';

const { PUBLIC_URL } = process.env;

interface Props {}

const Landing: React.FC<Props> = () => {
  return (
    <div className="landing">
      <div className="landing__col landing__left">
        <h1>
          Some Cringy
          <br />
          Ass Title.
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla est
          temporibus, quaerat architecto optio eum.
        </p>
        <LinkButton to="/" className="landing__btn">
          Explore Now &#8594;
        </LinkButton>
      </div>
      <div className="landing__col landing__right">
        <img
          src={`${PUBLIC_URL}/images/landing-man.png`}
          alt="Man"
          className="landing__splash"
        />
      </div>
    </div>
  );
};

export default Landing;
