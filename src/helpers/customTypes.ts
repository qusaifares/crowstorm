import { CartItemBase } from '../components/Cart/Cart';
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface IUser {
  _id?: string;
  name: {
    first: string;
    last: string;
    full?: string;
  };
  email?: string;
  password?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  cart?: CartItemBase[];
  orders?: string[];
  googleId?: string;
  createdAt?: Date;
}
