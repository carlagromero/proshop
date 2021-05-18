import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailReducer } from './reducers/products';
import cartReducer from './reducers/cart';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer
} from './reducers/user';

const reducer = combineReducers({
  productsList: productsReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const middleware = [thunk];
const INITIAL_STATE = {
  cart: {
    cartItems
  },
  userLogin: {
    userInfo
  }
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
