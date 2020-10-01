import React, { useState, useEffect, useRef } from 'react';
import './Cart.css';
import CurrencyFormat from 'react-currency-format';

import LinkButton from '../Buttons/LinkButton';
import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';
import { IProduct } from '../Product/Product';
import CartEmpty from '../CartEmpty/CartEmpty';
import OrderTotals from '../OrderTotals/OrderTotals';
import {
  getCartDetails,
  updateCart,
  getCartDetailsByIds
} from '../../helpers/api';
import { getCartTotals, Totals } from '../../helpers/functions';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  removeWrapper: {
    position: 'relative',
    width: 'max-content'
    // display: 'inline-block'
  },
  removeButton: {
    background: red[900]
  },
  removeProgress: {
    color: red[900],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -9,
    marginLeft: -9
  }
}));

interface Props {}

export interface CartItemBase {
  product: string;
  quantity: number;
}
export interface CartItem {
  product: IProduct;
  quantity: number;
}

const Cart: React.FC<Props> = () => {
  const [{ cart, user, taxRate }, dispatch] = useStateValue();
  const [cartDetails, setCartDetails] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<Totals>({
    subtotal: 0,
    tax: 0,
    total: 0
  });
  const [removing, setRemoving] = useState<number | null>(null);
  const isMounted = useRef(false);
  const classes = useStyles();

  const removeItem = async (i: number) => {
    setRemoving(i);
    let tempCart: CartItemBase[] = cart;
    tempCart.splice(i, 1);
    if (user?._id) {
      try {
        const cartData = await updateCart(tempCart, user._id);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch({
      type: ActionType.UPDATE_CART,
      cart: tempCart
    });

    updateTotal();
    setRemoving(null);
  };

  const fetchCartByProductIds = async () => {
    const cartData = await getCartDetailsByIds(cart);
    if (!Array.isArray(cartData)) return;
    if (!isMounted.current) return;
    setCartDetails(cartData);
  };

  const fetchCartDetails = async () => {
    if (!user._id) return;
    const cartData = await getCartDetails(user._id);
    if (!Array.isArray(cartData)) return;
    if (!isMounted.current) return;
    setCartDetails(cartData);
  };

  const updateTotal = () => {
    setTotals(getCartTotals(cartDetails, taxRate));
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      setCartDetails([]);
      setRemoving(null);
      setTotals({ subtotal: 0, tax: 0, total: 0 });
    };
  }, []);

  useEffect(() => {
    if (user?._id) {
      // if logged in
      fetchCartDetails();
    } else if (cart.length) {
      // if logged out
      fetchCartByProductIds();
    }
  }, [cart]);

  useEffect(() => {
    updateTotal();
  }, [cartDetails]);

  if (!cart.length) return <CartEmpty />;

  return (
    <div className='cart'>
      <table className='cart__table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails.map((item, i) => (
            <tr key={item.product?._id}>
              <td>
                <div className='cart__productInfo'>
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.title}
                  />
                  <div className='cart__productInfoText'>
                    <p>{item.product?.title}</p>{' '}
                    <CurrencyFormat
                      renderText={(value: number) => (
                        <small>Price: {value}</small>
                      )}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={item.product?.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix='$'
                    />
                    <div className={classes.removeWrapper}>
                      <Button
                        size='small'
                        onClick={() => removeItem(i)}
                        disabled={removing !== null}
                        className={classes.removeButton}
                        color='primary'
                        variant='contained'
                        style={{ transform: 'scale(0.8)' }}
                      >
                        Remove
                      </Button>
                      {removing === i && (
                        <CircularProgress
                          className={classes.removeProgress}
                          size={18}
                          color='secondary'
                        />
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.quantity}</td>
              <td>
                <CurrencyFormat
                  renderText={(value: number) => value}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={item.product.price * item.quantity}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='$'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='cart__total'>
        <OrderTotals {...totals} />
      </div>

      <LinkButton to='/checkout'>Checkout</LinkButton>
    </div>
  );
};

export default Cart;
