import React from 'react';
import './AuthButton.css';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
}

const AuthButton: React.FC<Props> = ({ icon: Icon, className, ...props }) => {
  return (
    <div className={`authButton ${className ? className : ''}`} {...props}>
      <Icon />
    </div>
  );
};

export default AuthButton;
