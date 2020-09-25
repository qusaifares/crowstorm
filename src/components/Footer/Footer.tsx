import React from 'react';
import './Footer.css';

const { PUBLIC_URL } = process.env;

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className='footer'>
      <div className='footer__row'>
        <div className='footer__col footer__col1'>
          <h3>Download Our App</h3>
          <p>Download App for Android and iOS</p>
          <div className='footer__appLogos'>
            <img src={`${PUBLIC_URL}/images/products/play-store.png`} alt='' />
            <img src={`${PUBLIC_URL}/images/products/app-store.png`} alt='' />
          </div>
        </div>
        <div className='footer__col footer__col2'>
          <img
            src={`${PUBLIC_URL}/images/logo-white.png`}
            alt='Crowstorm Logo'
          />
          {/* <p>
            Our purpose is Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Numquam, aliquam.
          </p> */}
        </div>
        <div className='footer__col footer__col3'>
          <h3>Useful Links</h3>
          <ul>
            <li>Coupons</li>
            <li>Blog Post</li>
            <li>Return Policy</li>
            <li>Join Affiliate</li>
          </ul>
        </div>
        <div className='footer__col footer__col4'>
          <h3>Connect With Me</h3>
          <ul>
            <li>
              <a
                href='https://qusaifares.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href='https://github.com/qusaifares'
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </a>
            </li>
            <li>
              <a
                href='https://www.linkedin.com/in/qusaifares'
                target='_blank'
                rel='noopener noreferrer'
              >
                LinkedIn
              </a>
            </li>

            <li>
              <a
                href='mailto:qusaifares@gmail.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer__row2'>
        <p className='footer_copyright'>Copyright 2020 - Qusai Fares</p>
      </div>
    </footer>
  );
};

export default Footer;
