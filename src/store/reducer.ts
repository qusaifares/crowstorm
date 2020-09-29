import { IUser } from './../customTypes/customTypes';
import { CartItemBase } from '../components/Cart/Cart';

export interface Action {
  type: ActionType;
  user?: IUser | null; // SET_USER
  cart?: CartItemBase[]; // UPDATE_CART
}

export enum ActionType {
  UPDATE_CART,
  SET_USER
}

export interface State {
  user: object | null;
  cart: CartItemBase[];
}

export const initialState: State = {
  user: null,
  cart: []
};

const reducer = (state: State, action: Action) => {
  console.log(action);

  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        cart: action.user?.cart || [],
        user: action.user
      };
    case ActionType.UPDATE_CART:
      localStorage.setItem('cart', JSON.stringify(action.cart || []));
      if (action.cart) {
        return {
          ...state,
          cart: [...(action.cart as CartItemBase[])]
        };
      } else {
        return state;
      }
  }
};

export default reducer;
