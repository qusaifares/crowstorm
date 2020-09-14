import React from 'react';
import './FeaturedCategory.css';

interface Props {
  title: string;
  children: React.ReactNode;
}

const FeaturedCategory: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="featuredCategory">
      <h2>{title}</h2>
      <div className="featuredCategory__products">{children}</div>
    </div>
  );
};

export default FeaturedCategory;
