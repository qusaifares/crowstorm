import { CartItemBase } from '../components/Cart/Cart';
import { IUser } from '../helpers/customTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './store';

import { signup, signin, updateCart } from '../helpers/api';

interface UserState {
  user: IUser | null;
  cart: CartItemBase[];
}

const initialState: UserState = {
  user: null,
  cart: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      if (action.payload?.cart) state.cart = action.payload.cart;
    },
    setCart: (state, action: PayloadAction<CartItemBase[]>) => {
      state.cart = action.payload;
    }
  }
});

export const { setUser, setCart } = userSlice.actions;

export const setUserAsync = (user: IUser | null): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(setUser(user));
  }, 1000);
};

// The function below is called a selector and allows us to select a name from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.name)`
export const selectUser = (state: RootState) => state.userInfo.user;
export const selectCart = (state: RootState) => state.userInfo.cart;

export default userSlice.reducer;
