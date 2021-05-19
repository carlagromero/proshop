import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector(state => state.cart);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = React.useState('PayPal');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <h1>Payment Method</h1>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value={paymentMethod}
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            />
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value={paymentMethod}
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            /> */}
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-4'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
