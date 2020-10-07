import React from 'react';
import './Landing.css';
import CustomButton from '../Buttons/CustomButton';

import { useStateValue } from '../../store/StateProvider';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userInfoSlice';

const { PUBLIC_URL } = process.env;

interface Props {}

const Landing: React.FC<Props> = () => {
  const user = useSelector(selectUser);
  const goToFeatured = () => {
    const featured = document.getElementById('featured');
    // @ts-ignore
    window.scrollTo({ top: featured?.offsetTop - 110, behavior: 'smooth' });
  };

  return (
    <div className='landing'>
      <div className='landing__col landing__left'>
        {user && <h2>Welcome, {user.name.first}!</h2>}
        <h1>
          Explore Your
          <br />
          True Style.
        </h1>
        <p>Make a style statement with our unique selection.</p>
        <CustomButton onClick={goToFeatured} className='landing__btn'>
          Explore Now &#8594;
        </CustomButton>
      </div>
      <div className='landing__col landing__right'>
        <img
          src={`${PUBLIC_URL}/images/landing-man.png`}
          alt='Man'
          className='landing__splash'
        />
      </div>
    </div>
  );
};

export default Landing;
