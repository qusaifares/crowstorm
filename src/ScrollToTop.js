import React, { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

const _ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
};

export const ScrollToTop = withRouter(_ScrollToTop);
