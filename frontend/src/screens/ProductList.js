import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getProducts } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, error, products } = useSelector(state => state.productsList);

  React.useEffect(() => {
    if (userInfo && userInfo.admin) {
      dispatch(getProducts());
    }
  }, [dispatch, userInfo]);

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      console.log(id);
    }
  };

  const handleCreateProduct = product => {
    console.log(product);
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: 'end' }}>
          <Button className='my-3' onClick={handleCreateProduct}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>BRAND</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => handleDelete(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductList;
