import React, { useState, ElementType } from 'react';
import { LinkProps } from '@material-ui/core';
import './LinkButton.css';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  linkProps?: React.PropsWithoutRef<LinkProps<any>> &
    React.RefAttributes<HTMLAnchorElement>;
  className?: string;
  children?: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({
  className,
  children,
  to,
  linkProps,
}) => {
  return to ? (
    // @ts-ignore
    <Link
      className={`linkButton ${className ? className : ''}`}
      to={to}
      {...linkProps}
    >
      {children}
    </Link>
  ) : (
    <div className={`linkButton ${className ? className : ''}`}>{children}</div>
  );
};

export default LinkButton;
