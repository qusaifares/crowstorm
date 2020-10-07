import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import './Checkout.css';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  FormControl,
  Select,
  InputLabel,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../Buttons/CustomButton';
import OrderTotals from '../OrderTotals/OrderTotals';
import { states } from '../../helpers/inputValidation';
import {
  createOrder,
  getCartDetails,
  getCartDetailsByIds,
  getClientSecret,
  updateCart
} from '../../helpers/api';
import { getCartTotals, Totals } from '../../helpers/functions';
import { Address } from '../../helpers/customTypes';
import { useStateValue } from '../../store/StateProvider';
import { ActionType } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectUser, setCart } from '../../redux/userInfoSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 20px',
    '& .MuiFormControl-root': {
      margin: theme.spacing(1)
    }
    // '& .MuiInput-underline::after': {
    //   borderColor: 'black'
    // }
  }
}));

interface Props {}

const primaryColor = '#ff523b';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: primaryColor,
      // color: '#fff',
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif",
      fontSize: '16px',
      fontSmoothing: 'antialiased'
      // '::placeholder': { color: 'black' }
    },
    invalid: {
      iconColor: '#d61c1c',
      color: '#d61c1c'
    }
  }
};

interface InfoValues {
  name: string;
  email: string;
  phone: string;
}

const initialInfo: InfoValues = {
  name: '',
  email: '',
  phone: ''
};

const initialShippingAddress: Address = {
  street: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States'
};

const Checkout: React.FC<Props> = () => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [totals, setTotals] = useState<Totals>({
    subtotal: 0,
    tax: 0,
    total: 0
  });

  const [{ taxRate }, _] = useStateValue();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);

  const isMounted = useRef(false);

  const fetchUpdateTotal = async () => {
    let cartDetails;
    if (user?._id) {
      cartDetails = await getCartDetails(user._id);
    } else {
      cartDetails = await getCartDetailsByIds(cart);
    }
    if (!cartDetails) return;
    setTotals(getCartTotals(cartDetails, taxRate));
  };

  useEffect(() => {
    if (!totals.total) return;
    const updateClientSecret = async () => {
      const clientSecretData = await getClientSecret(totals.total);
      if (isMounted.current) {
        setClientSecret(clientSecretData);
      }
    };
    updateClientSecret();
  }, [totals.total]);

  useEffect(() => {
    fetchUpdateTotal();
  }, [user, cart]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      setError('');
      setDisabled(false);
      setInfo(initialInfo);
      setShippingAddress(initialShippingAddress);
    };
  }, []);

  const classes = useStyles();
  const [info, setInfo] = useState(initialInfo);
  const [shippingAddress, setShippingAddress] = useState(
    initialShippingAddress
  );

  const handleStripeChange = (e: StripeCardElementChangeEvent) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const infoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'phone') {
      const phoneRegex = /^\d{0,10}$/;
      if (!phoneRegex.test(value)) return;
    }
    setInfo({ ...info, [name]: value });
  };

  const shippingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'zip') {
      const nonDigit = /[^\d]/g;
      setShippingAddress({
        ...shippingAddress,
        [name]: value.replace(nonDigit, '').substring(0, 5)
      });
      return;
    }
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const emptyCart = async () => {
    try {
      if (user?._id) {
        updateCart([], user._id);
      }
      dispatch(setCart([]));
    } catch (error) {
      console.log(error);
    }
  };

  const submitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    if (!clientSecret) return;
    if (!elements) return;
    const payload = await stripe
      ?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!
        }
      })
      .then(async ({ paymentIntent, error }) => {
        if (paymentIntent?.status === 'succeeded') {
          if (user?._id) {
            const order = await createOrder({
              user: user?._id,
              customerInfo: info,
              items: cart,
              shippingAddress,
              paymentInfo: {
                paymentId: paymentIntent.id,
                paymentType: 'stripe'
              },
              amount: paymentIntent.amount,
              isPaid: true,
              orderDate: new Date()
            });
            if (isMounted.current) {
              emptyCart();
              setSucceeded(true);
              setError('');
              setProcessing(false);
            }
            if (order?._id) {
              history.replace(`/confirmation/${order._id}`);
            }
            return;
          }
        }
        if (error?.message) {
          setError(error.message);
          setProcessing(false);
        }
      });
  };

  if (!user?._id) return <Redirect to='/register' />;

  return (
    <div className='checkout'>
      <h1 className='checkout__header'>Complete Your Purchase</h1>
      <div className='checkout__inner'>
        <div className='checkout__col checkout__left'>
          <form className={classes.root} onSubmit={submitPayment}>
            <h3 className='checkout__formHeader'>Customer Information</h3>
            <TextField
              onChange={infoInputChange}
              value={info.name}
              required
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='Name'
              name='name'
            />
            <TextField
              onChange={infoInputChange}
              value={info.email}
              required
              size='small'
              fullWidth
              variant='outlined'
              type='email'
              label='Email'
              name='email'
            />
            <TextField
              onChange={infoInputChange}
              value={info.phone}
              required
              size='small'
              fullWidth
              variant='outlined'
              type='tel'
              label='Phone'
              name='phone'
              inputProps={{
                pattern: '[0-9]{3}[0-9]{3}[0-9]{4}',
                maxLength: 10
              }}
            />
            <h3 className='checkout__formHeader'>Shipping Address</h3>
            <TextField
              onChange={shippingInputChange}
              value={shippingAddress.street}
              required
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='Street'
              name='street'
            />
            <TextField
              onChange={shippingInputChange}
              value={shippingAddress.city}
              required
              size='small'
              fullWidth
              variant='outlined'
              type='text'
              label='City'
              name='city'
            />
            <div className='checkout__formRow'>
              <FormControl variant='outlined' size='small' required>
                <InputLabel htmlFor='checkout__stateInput'>State</InputLabel>
                <Select
                  native
                  id='checkout__stateInput'
                  onChange={(e) => {
                    setShippingAddress({
                      ...shippingAddress,
                      state: e.target.value as string
                    });
                  }}
                  value={shippingAddress.state}
                  required
                  type='text'
                  label='State'
                  name='state'
                >
                  <option disabled value=''></option>
                  {states.map((s) => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <TextField
                onChange={shippingInputChange}
                value={shippingAddress.zip}
                required
                size='small'
                variant='outlined'
                type='text'
                label='Zip Code'
                name='zip'
                inputProps={{ pattern: '[0-9]{5}' }}
              />
            </div>
            <h3 className='checkout__formHeader'>Payment Information</h3>
            <div className='checkout__cardInfoContainer'>
              <CardElement
                // @ts-ignore
                options={CARD_OPTIONS}
                onChange={handleStripeChange}
              />
            </div>
            <CustomButton
              type='submit'
              disabled={processing || disabled || succeeded}
            >
              Submit
              {processing && (
                <CircularProgress
                  size={22}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: -11,
                    marginLeft: -11
                  }}
                />
              )}
            </CustomButton>
            {error && <div className='checkout__error'>{error}</div>}
          </form>
        </div>
        <div className='checkout__col checkout__right'>
          <div className='checkout__section'>
            <h3 className='checkout__summaryHeader'>Order Summary</h3>
            <OrderTotals {...totals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
