import React from 'react';
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Order = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const { loading, order, error } = useSelector(state => state.orderDetails);
  const { userInfo } = useSelector(state => state.userLogin);

  React.useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, history, order, orderId, userInfo]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map(orderItem => (
                    <ListGroup.Item key={orderItem.id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={orderItem.image}
                            alt={orderItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${orderItem.id}`}>
                            {orderItem.name}
                          </Link>
                        </Col>
                        <Col>
                          {orderItem.qty} x ${orderItem.price} = $
                          {orderItem.qty * orderItem.price}
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
                    <p>${order.itemsPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <p>Shipping</p>
                  </Col>
                  <Col md={6}>
                    <p>${order.shippingPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <p>Tax</p>
                  </Col>
                  <Col md={6}>
                    <p>${order.taxPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>
                    <p>Total</p>
                  </Col>
                  <Col md={6}>
                    <p>${order.totalPrice}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Order;
