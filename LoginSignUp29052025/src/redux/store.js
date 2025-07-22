import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../cart/cartSlice';
import wishlistReducer from '../wishlist/wishlistSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
