import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, NavLink, useHistory } from 'react-router-dom';
import {
  IconButton,
  Badge,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { Menu, Close } from '@material-ui/icons';
import CartIcon from '../icons/CartIcon';

import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectUser, setUser } from '../../redux/userInfoSlice';

const { PUBLIC_URL } = process.env;

interface Props {}

const Header: React.FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const [background, setBackground] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const logout = () => {
    setLogoutModalOpen(false);
    if (!user?._id) return history.push('/');
    dispatch(setUser(null));
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
            onClick={() => {
              setNavOpen(false);
              scrollToLanding();
            }}
            className='header__navLink'
            activeClassName='header__navLink-active'
            exact
            to='/'
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setNavOpen(false)}
            className='header__navLink'
            activeClassName='header__navLink-active'
            to='/products'
          >
            Products
          </NavLink>
          {/* <NavLink
          onClick={() => setNavOpen(false)} className='header__navLink' activeClassName='header__navLink-active' to='/about'>
            About
          </NavLink>
          <NavLink
          onClick={() => setNavOpen(false)} className='header__navLink' activeClassName='header__navLink-active' to='/contact'>
            Contact
          </NavLink> */}
          {user?._id ? (
            <>
              <NavLink
                onClick={() => setNavOpen(false)}
                className='header__navLink'
                activeClassName='header__navLink-active'
                to='/orders'
              >
                Orders
              </NavLink>
              <div
                className='header__navLink'
                onClick={(e) => {
                  setNavOpen(false);
                  setLogoutModalOpen(true);
                }}
              >
                Logout
              </div>
              <Dialog
                open={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
              >
                <DialogContent>
                  Are you sure you want to sign out?
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setLogoutModalOpen(false)}>No</Button>
                  <Button onClick={logout}>Yes</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => setNavOpen(false)}
                className='header__navLink'
                activeClassName='header__navLink-active'
                to='/login'
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => setNavOpen(false)}
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
