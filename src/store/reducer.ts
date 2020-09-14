export interface Action {
  type: ActionType;
  item?: object; // ADD_TO_CART
  user?: object; // SET_USER
}

export enum ActionType {
  ADD_TO_CART,
  SET_USER,
}

export interface State {
  user: object | null;
  cart: object[];
}

export const initialState: State = {
  user: null,
  cart: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case ActionType.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
  }
};

export default reducer;
