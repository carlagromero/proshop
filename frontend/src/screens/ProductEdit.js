import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductEdit = ({ match }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(state => state.productDetail);

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [countInStock, setCountInStock] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(getProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, product.name, productId]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <Link to='/admin/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='error'>{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='name'>
              <Form.Label className='mt-4'>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label className='mt-4'>Email Address</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image' className='mt-4'>
              <Form.Label className='mt-4'>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='brand' className='mt-4'>
              <Form.Label className='mt-4'>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='countInStock' className='mt-4'>
              <Form.Label className='mt-4'>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category' className='mt-4'>
              <Form.Label className='mt-4'>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description' className='mt-4'>
              <Form.Label className='mt-4'>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-4'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
