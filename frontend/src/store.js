import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailReducer } from './reducers/products';

const reducer = combineReducers({
  productsList: productsReducer,
  productDetail: productDetailReducer
});
const middleware = [thunk];
const INITIAL_STATE = {};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
