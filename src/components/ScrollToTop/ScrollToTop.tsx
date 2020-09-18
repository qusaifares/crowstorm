import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {}

const ScrollToTop: React.FC<Props> = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
