import React, { useState, useEffect } from 'react';
import './Products.css';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { IProduct } from '../Product/Product';

const { REACT_APP_SERVER_URL } = process.env;

interface Props {}
interface SortType {
  name: string;
  value: string;
  sort: (a: any, b: any) => any;
}
interface SortTypes {
  priceLowest: SortType;
  priceHighest: SortType;
  ratingHighest?: SortType;
}
const Products: React.FC<Props> = () => {
  const sortTypes: SortTypes = {
    priceLowest: {
      name: 'Price (Lowest)',
      value: 'priceLowest',
      sort: (a, b) => a.price - b.price
    },
    priceHighest: {
      name: 'Price (Highest)',
      value: 'priceHighest',
      sort: (a, b) => b.price - a.price
    }
    // ratingHighest: {
    //   name: 'Rating (Highest)',
    //   value: 'ratingHighest',
    //   sort: (a, b) => b.ratingData.stars - a.ratingData.stars
    // }
  };
  const [selectedSort, setSelectedSort] = useState<string>('priceLowest');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(8);

  const getProducts = async () => {
    try {
      const res = await fetch(`${REACT_APP_SERVER_URL}/products`);
      const data: IProduct[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    return () => {
      setProducts([]);
      setSelectedSort('priceLowest');
    };
  }, []);

  // return to page one when changing sort
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSort]);

  // set page buttons
  useEffect(() => {
    const numberOfPages = Math.ceil(products.length / productsPerPage);
    let tempPages = [];
    for (let i = 1; i <= numberOfPages; i++) {
      tempPages.push(i);
    }
    setPages(tempPages);
    return () => {
      setPages([]);
    };
  }, [products, productsPerPage]);
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
                <option key={v?.value} value={v?.value}>
                  {v?.name}
                </option>
              ))}
            </select>
          </>
        }
        footer={
          <div className='products__pageBtns'>
            {pages.map((num) => (
              <div
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`products__pageBtn ${
                  currentPage === num ? 'products__pageBtn-current' : ''
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        }
      >
        {products
          // @ts-ignore
          .sort(sortTypes[selectedSort].sort)
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          )
          .map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
      </ProductCategory>
    </div>
  );
};

export default Products;
