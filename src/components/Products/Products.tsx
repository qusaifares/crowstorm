import React, { useState } from 'react';
import './Products.css';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

interface Props {}
interface sortType {
  name: string;
  value: string;
  sort: (arr: sortType[]) => sortType[];
}
const Products: React.FC<Props> = () => {
  const sortTypes = {
    priceLowest: {
      name: 'Price (Lowest)',
      value: 'priceLowest',
      sort: (arr: any[]) => arr.sort((a, b) => a.price - b.price)
    },
    priceHighest: {
      name: 'Price (Highest)',
      value: 'priceHighest',
      sort: (arr: any[]) => arr.sort((a, b) => b.price - a.price)
    },
    ratingHighest: {
      name: 'Rating (Highest)',
      value: 'ratingHighest',
      sort: (arr: any[]) => arr.sort((a, b) => b.rating - a.rating)
    }
  };

  const [arr2, setArr2] = useState([5, 6, 7, 8, 9, 10, 11, 12]);
  const [selectedSort, setSelectedSort] = useState<string>('priceLowest');
  return (
    <div className='products'>
      <ProductCategory
        title='All Products'
        right={
          <>
            <label className='products__sortLabel' htmlFor='products__sortMenu'>
              Sort by
            </label>
            <select
              value={selectedSort}
              id='products__sortMenu'
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              {Object.values(sortTypes).map((v) => (
                <option value={v?.value}>{v?.name}</option>
              ))}
            </select>
          </>
        }
      >
        {arr2.map((num) => (
          <ProductCard
            title='Red Printed T-Shirt'
            image={`${process.env.PUBLIC_URL}/images/test/product-${num}.jpg`}
            price={10.9}
          />
        ))}
        <div className='products__pageBtns'>
          <div className='products__pageBtn products__pageBtn-current'>1</div>
          <div className='products__pageBtn'>2</div>
          <div className='products__pageBtn'>3</div>
          <div className='products__pageBtn'>4</div>
          <div className='products__pageBtn'>&#8594;</div>
        </div>
      </ProductCategory>
    </div>
  );
};

export default Products;
