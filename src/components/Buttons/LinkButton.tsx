import React from 'react';
import {} from 'react-router-dom';
import './Buttons.css';
import { Link, LinkProps } from 'react-router-dom';

interface Props extends LinkProps {}

const LinkButton: React.FC<Props> = ({
  className,
  children,
  ...componentProps
}) => {
  return (
    <Link
      className={`linkButton ${className ? className : ''}`}
      {...componentProps}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
