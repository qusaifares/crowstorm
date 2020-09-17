import React from 'react';
import './Buttons.css';

interface Props extends React.ComponentPropsWithoutRef<'button'> {}

const CustomButton: React.FC<Props> = ({
  className,
  children,
  ...componentProps
}) => {
  return (
    <button
      className={`customButton ${className ? className : ''}`}
      {...componentProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
