import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import {
  getProduct,
  createProductReview,
  resetProductReview
} from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const Product = ({ history, match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { product, loading, error } = useSelector(state => state.productDetail);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview
  } = useSelector(state => state.productReviewCreate);

  const [qty, setQty] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
      dispatch(resetProductReview());
    }
    dispatch(getProduct(productId));
  }, [productId, dispatch, successProductReview]);

  const handleSubmit = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const handleSubmitReview = e => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <div>
      <Link className='btn btn-light my3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    />
                  }
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              key => (
                                <option key={key + 1} value={key + 1}>
                                  {key + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Button
                        type='button'
                        onClick={handleSubmit}
                        disabled={product.countInStock === 0}
                        block
                      >
                        Add To Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <ListGroup variant='flush' className='mt-4'>
                <h3>Reviews</h3>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Write A Customer Review</h3>
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={handleSubmitReview}>
                      <Form.Group className='mt-4' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='mt-4' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button className='mt-4' type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Product;
