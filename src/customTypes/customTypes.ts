interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface IUser {
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
  orders?: string[];
  googleId?: string;
  createdAt?: Date;
}
