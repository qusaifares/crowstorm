import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import CartIcon from '../icons/CartIcon';

const { PUBLIC_URL } = process.env;

interface Props {}

const Header: React.FC<Props> = () => {
  const [background, setBackground] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let bool = window.scrollY >= 200;
      if (background !== bool) {
        setBackground(bool);
      }
    });
  }, [background]);
  return (
    <header className={`header ${background ? 'header-background' : ''}`}>
      <div className="header__inner">
        <img
          className="header__logo"
          src={`${PUBLIC_URL}/images/icon-black.png`}
          alt="Logo"
        />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/cart" className="header__cartIconLink">
            <CartIcon className="header__cartIcon" color="#000" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
