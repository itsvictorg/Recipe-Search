// see SignupForm.js for comments
import React, { useState } from 'react';

import { Form, Button, Alert } from 'react-bootstrap';
// import usemutation 
import { useMutation } from '@apollo/client';

// import { loginUser } from '../utils/API'; import graphql mutation
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';


const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // mutation for login of user -  dropped { error } claimed but never read !!
  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    };

    try {
      const { data } = await loginUser({ variables: { ...userFormData } });

      Auth.login(data.login.token);
      console.log('FORM SUBMIT', data);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    };

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  // if signup has a username field then why are we logging the user in with email.  what's the point of username??  there is none at that point.  if it is to just display their name to the user themself, pointless.  help them feel included with personal username login.
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            autoComplete="on"
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            autoComplete="on"
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
