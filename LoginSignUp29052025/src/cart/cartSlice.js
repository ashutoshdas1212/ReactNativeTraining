import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      const quantityToAdd = action.payload.quantity
        ? action.payload.quantity
        : 1;
      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        state.push({...action.payload, quantity: quantityToAdd});
      }
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          return state.filter(i => i.id !== action.payload);
        }
      }
    },
    clearCart: () => [],
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
