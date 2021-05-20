import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const formatDecimals = num => (Math.round(num * 100) / 100).toFixed(2);

const PlaceOrder = () => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    state => state.cart
  );

  const [itemsPrice, setItemsPrice] = React.useState(0);
  const [taxPrice, setTaxPrice] = React.useState(0);
  const [shippingPrice, setShippingPrice] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const items = formatDecimals(
      cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
    );
    const tax = formatDecimals(Number(0.15 * items));
    const shipping = formatDecimals(items > 100 ? 0 : 100);

    setItemsPrice(items);
    setTaxPrice(tax);
    setShippingPrice(shipping);
    setTotalPrice(Number(items) + Number(shipping) + Number(tax));
  }, [cartItems]);

  const handlePlaceOrder = () => {
    console.log('handlePlaceOrder');
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map(cartItem => (
                    <ListGroup.Item key={cartItem.id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${cartItem.id}`}>
                            {cartItem.name}
                          </Link>
                        </Col>
                        <Col>
                          {cartItem.qty} x ${cartItem.price} = $
                          {cartItem.qty * cartItem.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <p>Items</p>
                  </Col>
                  <Col md={6}>
                    <p>${itemsPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <p>Shipping</p>
                  </Col>
                  <Col md={6}>
                    <p>${shippingPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <p>Tax</p>
                  </Col>
                  <Col md={6}>
                    <p>${taxPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <p>Total</p>
                  </Col>
                  <Col md={6}>
                    <p>${totalPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    type='button'
                    disabled={cartItems.length === 0}
                    onClick={handlePlaceOrder}
                    block
                  >
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
