import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import CenterCard from '../centerCard';

const FormComponent = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validate={props.validate}
      onSubmit={props.onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
          <CenterCard>
            <Card>
              <Card.Body>
                <Form noValidate onSubmit={handleSubmit}>
                  {!props.isSignIn &&
                  <React.Fragment>
                    <Form.Group as={Row} style={{ marginBottom: '25px' }}>
                      <Form.Label column sm={2}>
                        First Name
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          placeholder="First Name"
                          onChange={handleChange}
                          isValid={touched.firstName && !errors.firstName}
                        />
                        {errors.firstName && <Alert style={{ marginTop: '10px' }} variant={'danger'}>
                          {errors.firstName}
                        </Alert>}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ marginBottom: '25px' }}>
                      <Form.Label column sm={2}>
                        Last Name
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          placeholder="Last Name"
                          onChange={handleChange}
                          isValid={touched.lastName && !errors.lastName}
                        />
                        {errors.lastName && <Alert style={{ marginTop: '10px' }} variant={'danger'}>
                          {errors.lastName}
                        </Alert>}
                      </Col>
                    </Form.Group>
                  </React.Fragment>
                  }
                  <Form.Group as={Row} style={{ marginBottom: '25px' }} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                      Email
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Email"
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                      />
                      {errors.email && <Alert style={{ marginTop: '10px' }} variant={'danger'}>
                        {errors.email}
                      </Alert>}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} style={{ marginBottom: '25px' }} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                      Password
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        isValid={touched.email && !errors.email}
                      />
                      {errors.password && <Alert style={{ marginTop: '10px' }} variant={'danger'}>
                        {errors.password}
                      </Alert>}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit">{props.buttonLabel}</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </CenterCard>
        )}
    </Formik>
  );
}

export default FormComponent;
