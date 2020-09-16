import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';
import CartIcon from '../icons/CartIcon';

const { PUBLIC_URL } = process.env;

interface Props {}

const Header: React.FC<Props> = () => {
  const [background, setBackground] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let bool = window.scrollY >= 100;
      if (background !== bool) {
        setBackground(bool);
      }
    });
  }, [background]);
  return (
    <header className={`header ${background ? 'header-background' : ''}`}>
      <div className='header__inner'>
        <Link to='/' className='header__logoLink'>
          <img
            className='header__logo'
            src={`${PUBLIC_URL}/images/icon-black.png`}
            alt='Logo'
          />
        </Link>
        <IconButton
          onClick={() => setNavOpen(!navOpen)}
          className='header__menuButton'
        >
          {navOpen ? <Close fontSize='large' /> : <Menu fontSize='large' />}
        </IconButton>
        <nav className={navOpen ? 'header__nav-open' : undefined}>
          <Link to='/'>Home</Link>
          <Link to='/products'>Products</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/login'>Login</Link>
          <Link to='/cart' className='header__cartIconLink'>
            <CartIcon className='header__cartIcon' />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
