import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector(state => state.cart);

  const [address, setAddress] = React.useState(shippingAddress.address);
  const [city, setCity] = React.useState(shippingAddress.city);
  const [postalCode, setPostalCode] = React.useState(
    shippingAddress.postalCode
  );
  const [country, setCountry] = React.useState(shippingAddress.country);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address'>
          <Form.Label className='mt-4'>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label className='mt-4'>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label className='mt-4'>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label className='mt-4'>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-4'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
