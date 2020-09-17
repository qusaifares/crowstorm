import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';
import CartIcon from '../icons/CartIcon';
import { useStateValue } from '../../store/StateProvider';

const { PUBLIC_URL } = process.env;

interface Props {}

const Header: React.FC<Props> = () => {
  const [{ user }, dispatch] = useStateValue();
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

        <nav className={navOpen ? 'header__nav-open' : undefined}>
          <Link to='/'>Home</Link>
          <Link to='/products'>Products</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
          {!user?._id && <Link to='/login'>Login</Link>}
        </nav>
        <div className='header__icons'>
          <IconButton
            component={Link}
            to='/cart'
            className='header__cartIconLink'
          >
            <CartIcon className='header__cartIcon' />
          </IconButton>
          <IconButton
            onClick={() => setNavOpen(!navOpen)}
            className='header__menuButton'
          >
            {navOpen ? <Close fontSize='large' /> : <Menu fontSize='large' />}
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
