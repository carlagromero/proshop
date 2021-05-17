import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const alreadyExists = state.cartItems.find(
        cartItem => cartItem.id === item.id
      );

      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(cartItem =>
            cartItem.id === item.id ? item : cartItem
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default cartReducer;
