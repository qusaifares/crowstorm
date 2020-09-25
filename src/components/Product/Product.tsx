import React, { useState, useEffect } from 'react';
import './Product.css';
import CurrencyFormat from 'react-currency-format';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import CustomButton from '../Buttons/CustomButton';
import NotFound from '../NotFound/NotFound';
import { useHistory } from 'react-router';
import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';
import { CartItem } from '../Cart/Cart';

const { REACT_APP_SERVER_URL } = process.env;

// Enum of colors (Keep consistent with client side)
export enum Color {
  White = 'white',
  Black = 'black',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Brown = 'brown',
  Gray = 'gray',
  Pink = 'pink'
}

// Enum of product types (Keep consistent with client side)
export enum ProductType {
  Jacket = 'Jacket',
  Shirt = 'Shirt',
  Pants = 'Pants',
  Watch = 'Watch',
  Footwear = 'Footwear',
  Other = 'Other'
}

export interface Rating {
  user: string;
  rating: number;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  productType: ProductType;
  color: Color;
  images: string[];
  ratingData: {
    stars: number;
    ratings: Rating[];
  };
  createdAt: Date;
}

interface Props {
  match: any;
}

const Product: React.FC<Props> = ({ match }) => {
  const history = useHistory();
  const [{ cart }, dispatch] = useStateValue();
  const [product, setProduct] = useState<IProduct | undefined>();
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [mainImg, setMainImg] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [notFound, setNotFound] = useState<boolean>(false);

  const updateQuantity = (e: React.FocusEvent<HTMLInputElement>) => {
    if (quantity >= 1 && quantity % 1 === 0) return;
    if (!quantity || quantity < 1) return setQuantity(1);
    if (quantity % 1) return setQuantity(Math.floor(quantity));
  };

  const getProductInfo = async () => {
    try {
      const res = await fetch(
        `${REACT_APP_SERVER_URL}/products/${match.params.id}`
      );
      const data: IProduct = await res.json();
      setProduct(data);
      setMainImg(data.images[0]);
    } catch (error) {
      console.log(error);
      setNotFound(true);
      // history.push('/404');
    }
  };

  const getRelatedProducts = async () => {
    try {
      const res = await fetch(`${REACT_APP_SERVER_URL}/products?limit=5`);
      let data: IProduct[] = await res.json();
      data = data.filter((prod) => prod._id !== product?._id).slice(0, 4);
      setRelatedProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (!product) return;
    const itemIndex = (cart as CartItem[]).findIndex(
      (item) => product?._id && item.product?._id === product?._id
    );
    let tempCart: CartItem[] = cart;
    if (itemIndex !== -1) {
      tempCart[itemIndex].quantity = tempCart[itemIndex].quantity + quantity;
    } else {
      tempCart.push({
        productId: product?._id,
        product,
        quantity
      });
    }
    dispatch({ type: ActionType.UPDATE_CART, cart: tempCart });
  };

  useEffect(() => {
    getProductInfo();
    getRelatedProducts();
  }, [match.params.id]);

  if (notFound) return <NotFound />;

  return (
    <div className='product'>
      <div className='product__inner'>
        <div className='product__row product__row1'>
          <div className='product__col product__left'>
            <img
              src={mainImg || ''}
              alt={product?.title}
              className='product__mainImg'
            />
            <div className='product__smallImgRow'>
              {product?.images?.map((img) => (
                <img
                  key={img}
                  onClick={() => setMainImg(img)}
                  className='product__smallImg'
                  src={img}
                  alt=''
                />
              ))}
            </div>
          </div>
          <div className='product__col product__right'>
            <p>Home / {product?.productType}</p>
            <h1>{product?.title}</h1>
            <CurrencyFormat
              renderText={(value: number) => <h4>{value}</h4>}
              decimalScale={2}
              fixedDecimalScale={true}
              value={product?.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix='$'
            />
            <select id='product__sizeMenu'>
              <option>XXL</option>
              <option>XL</option>
              <option>Large</option>
              <option>Medium</option>
              <option>Small</option>
            </select>
            <input
              type='number'
              id='product__quantity'
              min={1}
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.valueAsNumber)}
              onBlur={updateQuantity}
            />
            {/*@ts-ignore*/}
            <CustomButton onClick={addToCart}>Add to cart</CustomButton>
            <h3 className='product__detailsHeader'>Product Details</h3>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
      <ProductCategory title='Related Products' right={<div></div>}>
        {relatedProducts.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </ProductCategory>
    </div>
  );
};

export default Product;
