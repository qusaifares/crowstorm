import { CartItemBase } from './../components/Cart/Cart';
const { REACT_APP_SERVER_URL } = process.env;

const credentials = 'include';

export const signup = async (info: object) => {
  try {
    const body = JSON.stringify(info);
    const options: RequestInit = {
      method: 'POST',
      body,
      credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/register/`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (info: object) => {
  const body = JSON.stringify(info);
  const options: RequestInit = {
    method: 'POST',
    body,
    credentials,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/login/`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCartDetails = async () => {
  try {
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/cart`, {
      credentials
    });
    const data = await res.json();
    console.log(data);
    return data.cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (cart: CartItemBase[]) => {
  const body = JSON.stringify(cart);
  try {
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/cart`, {
      method: 'PUT',
      body,
      credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data.cart;
  } catch (error) {
    console.log(error);
  }
};
