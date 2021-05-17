import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card
} from 'react-bootstrap';
import { addItem, removeItem } from '../actions/cartActions';
import Message from '../components/Message';

const Cart = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  React.useEffect(() => {
    if (productId) {
      dispatch(addItem(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handleRemoveItem = id => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        dispatch(addItem(item.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(key => (
                        <option key={key + 1} value={key + 1}>
                          {key + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={e => handleRemoveItem(item.id)}
                      block
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, cur) => acc + cur.qty * cur.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Button
                  type='button'
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                  block
                >
                  Proceed To Checkout
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
