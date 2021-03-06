import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import UserList from './screens/UserList';
import UserEdit from './screens/UserEdit';
import ProductList from './screens/ProductList';
import ProductEdit from './screens/ProductEdit';
import OrderList from './screens/OrderList';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/payment' component={Payment} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={Order} />
          <Route path='/admin/user-list' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route path='/admin/product-list' exact component={ProductList} />
          <Route
            path='/admin/product-list/page/:pageNumber'
            exact
            component={ProductList}
          />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />
          <Route path='/admin/order-list' component={OrderList} />
          <Route path='/search/:keyword' exact component={Home} />
          <Route path='/page/:pageNumber' exact component={Home} />
          <Route
            exact
            path='/search/:keyword/page/:pageNumber'
            component={Home}
          />
          <Route path='/' exact component={Home} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
