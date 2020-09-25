import React from 'react';
import './ProductCategory.css';

interface Props extends React.ComponentProps<'div'> {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const ProductCategory: React.FC<Props> = ({
  title,
  left,
  right,
  footer,
  children,
  ...rest
}) => {
  return (
    <div {...rest} className='productCategory'>
      {title &&
        (left || right ? (
          <div className='productCategory__header'>
            {left && <div className='productCategory__headerLeft'>{left}</div>}
            <div className='productCategory__headerCenter'>
              <h2>{title}</h2>
            </div>
            {right && (
              <div className='productCategory__headerRight'>{right}</div>
            )}
          </div>
        ) : (
          <h2>{title}</h2>
        ))}

      <div className='productCategory__products'>{children}</div>
      {footer && <div className='productCategory__footer'>{footer}</div>}
    </div>
  );
};

export default ProductCategory;
