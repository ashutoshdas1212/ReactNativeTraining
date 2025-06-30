export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.product.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...state, {...action.product, quantity: 1}];
   
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.itemId);
   
    case 'UPDATE_QUANTITY':
      if (action.newQuantity < 1) {
        return state.filter(item => item.id !== action.itemId);
      }
      return state.map(item =>
        item.id === action.itemId
          ? {...item, quantity: action.newQuantity}
          : item
      );
   
    case 'CLEAR_CART':
      return [];
   
    default:
      return state;
  }
};