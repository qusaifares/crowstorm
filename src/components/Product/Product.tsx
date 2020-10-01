import React, { useState, useEffect } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CircularProgress, Snackbar, SnackbarProps } from '@material-ui/core';
import ProductCategory from '../ProductCategory/ProductCategory';
import ProductCard from '../ProductCard/ProductCard';
import CustomButton from '../Buttons/CustomButton';
import NotFound from '../NotFound/NotFound';
// import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';
import { CartItem, CartItemBase } from '../Cart/Cart';
import productOptions from '../../helpers/productOptions';
import { updateCart } from '../../helpers/api';

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
  Jackets = 'Jackets',
  Sweaters = 'Sweaters',
  Shirts = 'Shirts',
  Pants = 'Pants',
  Watches = 'Watches',
  Footwear = 'Footwear',
  Socks = 'Socks',
  Underwear = 'Underwear',
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
  // const history = useHistory();
  const [{ user, cart }, dispatch] = useStateValue();
  const [product, setProduct] = useState<IProduct | undefined>();
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [mainImg, setMainImg] = useState<string | null>(null);
  const [sizes, setSizes] = useState<any[]>([]);
  const [size, setSize] = useState<any>();
  const [quantity, setQuantity] = useState<number>(1);
  const [notFound, setNotFound] = useState<boolean>(false);

  const updateQuantity = (e: React.FocusEvent<HTMLInputElement>) => {
    if (quantity >= 1 && quantity <= 99 && quantity % 1 === 0) return;
    if (!quantity || quantity < 1) return setQuantity(1);
    if (quantity > 99) return setQuantity(99);
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

  const addToCart = async () => {
    if (!product) return;
    const itemIndex = (cart as CartItemBase[]).findIndex(
      (item) => product?._id && item.product === product?._id
    );
    let tempCart: CartItemBase[] = cart;
    if (itemIndex !== -1) {
      tempCart[itemIndex].quantity = tempCart[itemIndex].quantity + quantity;
    } else {
      tempCart.push({
        product: product._id,
        quantity
      });
    }
    try {
      if (user?._id) {
        const cartData: CartItemBase[] =
          (await updateCart(tempCart, user._id)) || [];
        dispatch({
          type: ActionType.UPDATE_CART,
          cart: cartData
        });
      } else {
        dispatch({ type: ActionType.UPDATE_CART, cart: tempCart });
      }
      setProductSnackbar({ ...productSnackbar, open: true });
      setQuantity(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductInfo();
    return () => {
      setNotFound(false);
      setQuantity(1);
      setProduct(undefined);
      setRelatedProducts([]);
      setMainImg(null);
      setSizes([]);
      setSize(undefined);
    };
  }, [match.params.id]);

  useEffect(() => {
    if (product) {
      getRelatedProducts();
      const tempSizes = productOptions[product.productType];
      if (tempSizes) {
        setSizes(tempSizes);
        setSize(tempSizes[0]);
      }
    }
  }, [product]);
  const [productSnackbar, setProductSnackbar] = useState<SnackbarProps>({
    open: false,
    message: 'Added product to cart.',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 5000
  });

  if (notFound) return <NotFound />;

  return (
    <div className='product'>
      <Snackbar
        {...productSnackbar}
        onClose={() => setProductSnackbar({ ...productSnackbar, open: false })}
      />
      <div className='product__inner'>
        <div className='product__row product__row1'>
          {product ? (
            <>
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
                <p>
                  <Link to='/products'>Home</Link> / {product?.productType}
                </p>
                <h1>{product?.title}</h1>
                <CurrencyFormat
                  renderText={(value: number) => (
                    <h4 className='product__price'>{value}</h4>
                  )}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={product?.price}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='$'
                />
                {sizes.length ? (
                  <select
                    value={size}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      if (!isNaN(+e.target.value)) {
                        setSize(+e.target.value);
                      } else {
                        setSize(e.target.value);
                      }
                    }}
                    id='product__sizeMenu'
                  >
                    {sizes?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : null}
                <input
                  type='number'
                  id='product__quantity'
                  min={1}
                  max={99}
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
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
      {product && (
        <ProductCategory title='Related Products' right={<div></div>}>
          {relatedProducts.length ? (
            relatedProducts.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))
          ) : (
            <CircularProgress />
          )}
        </ProductCategory>
      )}
    </div>
  );
};

export default Product;
