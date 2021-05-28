import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getProduct,
  updateProduct,
  resetUpdateProduct
} from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductEdit = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(state => state.productDetail);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = useSelector(state => state.productUpdate);

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [countInStock, setCountInStock] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    if (successUpdate) {
      dispatch(resetUpdateProduct());
      history.push('/admin/product-list');
    } else {
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
    }
  }, [dispatch, product, productId, successUpdate, history]);

  const handleSubmit = e => {
    e.preventDefault();
    const product = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    };

    dispatch(updateProduct(product));
  };

  const handleUploadFile = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to='/admin/product-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='error'>{errorUpdate}</Message>}
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
              <Form.Label className='mt-4'>Price</Form.Label>
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
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={handleUploadFile}
              ></Form.File>
              {uploading && <Loader />}
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
