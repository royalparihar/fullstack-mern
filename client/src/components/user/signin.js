import React from 'react';
// import { Formik } from 'formik';
// import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import CenterCard from '../centerCard';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from './form';
import {signUserIn} from '../../actions';

const SigninForm = (props) => {
  if (props.authenticated) {
    return (
        <Redirect to='/'/>
    )
  }
  return (
    <Form
      initialValues={{
        email: '',
        password: '',
      }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        } else if(!values.password) {
          errors.password = 'Required'
        }
        return errors;
      }}
      onSubmit={(values) => {
        props.signUserIn(values);
      }}
      buttonLabel="Sign In"
      isSignIn
    />
  )
}

function mapStateToProps({user}){
  return {
    authenticated: user.authenticated
  }
}

export default connect(mapStateToProps, {signUserIn})(SigninForm);

// export default SigninForm;
