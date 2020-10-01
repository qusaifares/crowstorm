import { IUser } from '../helpers/customTypes';
import { CartItemBase } from '../components/Cart/Cart';

export interface Action {
  type: ActionType;
  user?: IUser | null; // SET_USER
  cart?: CartItemBase[]; // UPDATE_CART
}

export enum ActionType {
  UPDATE_CART = 0,
  SET_USER = 1
}

export interface State {
  user: IUser | null;
  cart: CartItemBase[];
  taxRate: number;
}

export const initialState: State = {
  user: null,
  cart: [],
  taxRate: 0.07
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        cart: action.user?.cart || [],
        user: action.user
      };
    case ActionType.UPDATE_CART:
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
