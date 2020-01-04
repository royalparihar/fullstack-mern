import React from 'react';
import { connect } from 'react-redux';
import Form from './form';
import {updateProfile} from '../../actions';

const Profile = (props) => {

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
        props.updateProfile(values);
      }}
      buttonLabel="Update Profile"
    />
  )
}


export default connect(null, {updateProfile})(Profile);

// export default SigninForm;
