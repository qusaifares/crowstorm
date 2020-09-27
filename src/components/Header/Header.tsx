import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { IconButton, Badge } from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';
import CartIcon from '../icons/CartIcon';
import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';

const { PUBLIC_URL } = process.env;

interface Props {}

const Header: React.FC<Props> = () => {
  const history = useHistory();
  const [{ user, cart }, dispatch] = useStateValue();
  const [background, setBackground] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const logout = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!user._id) return history.push('/');
    dispatch({ type: ActionType.SET_USER, user: null });
    localStorage.removeItem('email');
    history.push('/');
  };
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let bool = window.scrollY >= 100;
      if (background !== bool) {
        setBackground(bool);
      }
    });
  }, [background]);

  const scrollToLanding = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <header className={`header ${background ? 'header-background' : ''}`}>
      <div className='header__inner'>
        <Link to='/' onClick={scrollToLanding} className='header__logoLink'>
          <img
            className='header__logo'
            src={`${PUBLIC_URL}/images/icon-black.png`}
            alt='Logo'
          />
        </Link>

        <nav className={navOpen ? 'header__nav-open' : undefined}>
          <NavLink
            className='header__navLink'
            activeClassName='header__navLink-active'
            onClick={scrollToLanding}
            exact
            to='/'
          >
            Home
          </NavLink>
          <NavLink
            className='header__navLink'
            activeClassName='header__navLink-active'
            to='/products'
          >
            Products
          </NavLink>
          {/* <NavLink className='header__navLink' activeClassName='header__navLink-active' to='/about'>
            About
          </NavLink>
          <NavLink className='header__navLink' activeClassName='header__navLink-active' to='/contact'>
            Contact
          </NavLink> */}
          {user?._id ? (
            <div className='header__navLink' onClick={logout}>
              Logout
            </div>
          ) : (
            <>
              <NavLink
                className='header__navLink'
                activeClassName='header__navLink-active'
                to='/login'
              >
                Login
              </NavLink>
              <NavLink
                className='header__navLink'
                activeClassName='header__navLink-active'
                to='/register'
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
        <div className='header__icons'>
          <IconButton
            component={Link}
            to='/cart'
            className='header__cartIconLink'
          >
            <Badge color='primary' badgeContent={cart?.length}>
              <CartIcon className='header__cartIcon' />
            </Badge>
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
