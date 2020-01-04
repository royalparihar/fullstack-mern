import React from 'react';
// import { Formik } from 'formik';
// import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
// import CenterCard from '../centerCard';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from './form';
import {signUserUp} from '../../actions';

const SignUpForm = (props) => {
  if (props.authenticated) {
    return (
        <Redirect to='/'/>
    )
  }

  return (
    <Form
      initialValues={{
        firstName: '',
        lastName: '',
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
        } else if(!values.firstName) {
          errors.firstName = 'Required'
        } else if(!values.lastName) {
          errors.lastName = 'Required'
        }
        return errors;
      }}
      onSubmit={(values) => {
        props.signUserUp(values);
      }}
      buttonLabel="Sign Up"
    />
  )
}


function mapStateToProps({user}){
  return {
    authenticated: user.authenticated
  }
}

export default connect(mapStateToProps, {signUserUp})(SignUpForm);

// export default SigninForm;
