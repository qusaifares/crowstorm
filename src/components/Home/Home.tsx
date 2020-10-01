import React, { useEffect } from 'react';
import './Home.css';
import Landing from '../Landing/Landing';
import Featured from '../Featured/Featured';
import Testimonial from '../Testimonial/Testimonial';
import Brands from '../Brands/Brands';

interface Props {}

const Home: React.FC<Props> = () => {
  useEffect(() => {
    const homePageTitle = 'CrowStorm';
    document.title = homePageTitle;
  }, []);

  return (
    <div className='home'>
      <Landing />
      <Featured />
      <Testimonial />
      {/* <Brands /> */}
    </div>
  );
};

export default Home;
