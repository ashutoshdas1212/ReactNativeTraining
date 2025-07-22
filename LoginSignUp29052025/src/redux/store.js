import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../cart/cartSlice';
import wishlistReducer from '../wishlist/wishlistSlice';
import authReducer from '../auth/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
