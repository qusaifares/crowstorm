import React, { useEffect } from 'react';
import './Home.css';
import Landing from '../Landing/Landing';
import Featured from '../Featured/Featured';
import Testimonial from '../Testimonial/Testimonial';
import Brands from '../Brands/Brands';
import Footer from '../Footer/Footer';
import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';

interface Props {}

const Home: React.FC<Props> = () => {
  const [{ pageTitle }, dispatch] = useStateValue();
  useEffect(() => {
    const homePageTitle = 'CrowStorm';
    if (pageTitle !== homePageTitle) {
      dispatch({
        action: ActionType.SET_PAGE_TITLE,
        pageTitle: homePageTitle
      });
    }
  });

  return (
    <div className='home'>
      <Landing />
      <Featured />
      <Testimonial />
      <Brands />
    </div>
  );
};

export default Home;
