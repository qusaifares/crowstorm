export interface Action {
  type: ActionType;
  pageTitle?: string; // SET_PAGE_TITLE
  user?: object; // SET_USER
  item?: object; // ADD_TO_CART
}

export enum ActionType {
  SET_PAGE_TITLE,
  ADD_TO_CART,
  SET_USER
}

export interface State {
  pageTitle: string;
  user: object | null;
  cart: object[];
}

export const initialState: State = {
  pageTitle: 'CrowStorm',
  user: null,
  cart: []
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.pageTitle
      };
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.user
      };
    case ActionType.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.item]
      };
  }
};

export default reducer;
