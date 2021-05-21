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
          <Route path='/' exact component={Home} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
