import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const Home = () => {
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get('/products');
    setProducts(data);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
