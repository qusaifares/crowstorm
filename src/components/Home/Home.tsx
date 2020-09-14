import React from 'react';
import './Home.css';
import Landing from '../Landing/Landing';
import Featured from '../Featured/Featured';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className="home">
      <Landing />
      <Featured />
    </div>
  );
};

export default Home;
