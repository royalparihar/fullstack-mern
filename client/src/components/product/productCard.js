import React from 'react';
import { Card, Button } from 'react-bootstrap'; 
const ProductCard = (props={}) => (
  <Card style={{ margin: '10px' }}>
      <Card.Img variant="top" src="http://shfcs.org/en/wp-content/uploads/2015/11/MedRes_Product-presentation-2.jpg" />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{`$ ${props.price}`}</Card.Text>
        <Button onClick={() =>
            props.authenticated ?
            props.addToCart(props._id) :
            props.history.push('/signin')}
          variant="primary">
          Add to cart</Button>
      </Card.Body>
    </Card>
);

export default ProductCard
