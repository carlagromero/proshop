import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailReducer } from './reducers/products';
import cartReducer from './reducers/cart';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userProfileUpdateReducer,
  usersListReducer,
  userDeleteReducer,
  userUpdatedReducer
} from './reducers/user';
import {
  orderDetailsReducer,
  orderReducer,
  orderPayReducer,
  ordersListUserRedurcer
} from './reducers/order';

const reducer = combineReducers({
  productsList: productsReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  usersList: usersListReducer,
  orderCreated: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  ordersListUser: ordersListUserRedurcer,
  userDelete: userDeleteReducer,
  userUpdated: userUpdatedReducer
});

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const middleware = [thunk];
const INITIAL_STATE = {
  cart: {
    cartItems,
    shippingAddress
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
