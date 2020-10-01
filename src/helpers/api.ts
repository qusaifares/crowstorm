import { Address, IUser } from './customTypes';
import { CartItem, CartItemBase } from './../components/Cart/Cart';
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

export const getCartDetails = async (userId: string) => {
  try {
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/${userId}`, {
      credentials
    });
    const data = await res.json();
    return data.cart as CartItem[];
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (
  cart: CartItemBase[],
  userId: string
): Promise<CartItemBase[] | undefined> => {
  const body = JSON.stringify({ cart });
  try {
    const res = await fetch(`${REACT_APP_SERVER_URL}/users/${userId}`, {
      method: 'PUT',
      body,
      credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data: IUser = await res.json();
    if (data.cart) return data.cart;
    return [];
  } catch (error) {
    console.log(error);
  }
};

export const getCartDetailsByIds = async (cart: CartItemBase[]) => {
  try {
    const body = JSON.stringify(cart);
    const res = await fetch(`${REACT_APP_SERVER_URL}/products/populateCart`, {
      method: 'POST',
      body,
      credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data: CartItem[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getClientSecret = async (cartTotal: number) => {
  try {
    const body = JSON.stringify({ total: Math.round(cartTotal * 100) });
    const res = await fetch(`${REACT_APP_SERVER_URL}/orders/createIntent`, {
      method: 'POST',
      body,
      credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (!data.client_secret) throw data;
    return data.client_secret;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (
  orderInfo: IOrder
): Promise<IOrderPopulated | undefined> => {
  try {
    const body = JSON.stringify(orderInfo);
    const res = await fetch(`${REACT_APP_SERVER_URL}/orders/`, {
      method: 'POST',
      body,
      credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (userId: string) => {
  try {
    const res = await fetch(`${REACT_APP_SERVER_URL}/orders?userId=${userId}`, {
      credentials
    });
    const data: IOrderPopulated[] = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const res = await fetch(`${REACT_APP_SERVER_URL}/orders/${orderId}`, {
      credentials
    });
    const data: IOrderPopulated = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// TYPES
interface PaymentInfo {
  paymentId: string;
  paymentType: 'paypal' | 'stripe';
}

export interface IOrderBase {
  _id?: string;
  user: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: Address;
  paymentInfo: PaymentInfo;
  amount: number;
  isPaid: boolean;
  isShipped?: boolean;
  orderDate?: Date;
  shipDate?: Date;
}

export interface IOrder extends IOrderBase {
  items: CartItemBase[];
}
export interface IOrderPopulated extends IOrderBase {
  items: CartItem[];
  orderDate: Date;
}
