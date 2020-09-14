import React from 'react';
import './LinkButton.css';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({ to, className, children }) => {
  return (
    <Link to={to} className={`linkButton ${className ? className : ''}`}>
      {children}
    </Link>
  );
};

export default LinkButton;
