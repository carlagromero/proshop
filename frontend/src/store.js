import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailReducer } from './reducers/products';
import cartReducer from './reducers/cart';

const reducer = combineReducers({
  productsList: productsReducer,
  productDetail: productDetailReducer,
  cart: cartReducer
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const middleware = [thunk];
const INITIAL_STATE = {
  cart: {
    cartItems
  }
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
