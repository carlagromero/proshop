import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getUserDetails,
  updateUserById,
  resetUserUpdated
} from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserEdit = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = useSelector(state => state.userUpdated);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [admin, setAdmin] = React.useState('');

  React.useEffect(() => {
    if (successUpdate) {
      history.push('/admin/user-list');
      dispatch(resetUserUpdated());
    }
    if (!user || !user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setAdmin(user.admin);
    }
  }, [dispatch, userId, user, successUpdate, history]);

  const handleSubmit = e => {
    e.preventDefault();

    const userToUpdate = {
      _id: user._id,
      name,
      email,
      admin
    };

    dispatch(updateUserById(userToUpdate));
  };

  return (
    <>
      <Link to='/admin/user-list' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
            <Form.Group controlId='email'>
              <Form.Label className='mt-4'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='isAdmin' className='mt-4'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={admin}
                onChange={e => setAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
