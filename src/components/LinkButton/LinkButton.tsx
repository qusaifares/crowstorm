import React, { ElementType } from 'react';
import './LinkButton.css';
import { Link } from 'react-router-dom';

interface Props extends React.Props<any> {
  to: string;
  component?: React.ComponentType<any> | ElementType;
  // componentProps?: object;
  className?: string;
  children?: React.ReactNode;
}

const LinkButton: React.FC<Props> = ({
  component: Tag,
  to,
  className,
  children,
  ...componentProps
}) => {
  return Tag ? (
    <Tag
      className={`linkButton ${className ? className : ''}`}
      {...componentProps}
    >
      {children}
    </Tag>
  ) : (
    <Link to={to} className={`linkButton ${className ? className : ''}`}>
      {children}
    </Link>
  );
};

export default LinkButton;
