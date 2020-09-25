import { CartItem } from '../components/Cart/Cart';

export interface Action {
  type: ActionType;
  user?: object | null; // SET_USER
  cart?: CartItem[]; // UPDATE_CART
}

export enum ActionType {
  UPDATE_CART,
  SET_USER
}

export interface State {
  user: object | null;
  cart: CartItem[];
}

export const initialState: State = {
  user: null,
  cart: []
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.user
      };
    case ActionType.UPDATE_CART:
      return {
        ...state,
        cart: action.cart
      };
  }
};

export default reducer;
