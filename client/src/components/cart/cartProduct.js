import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CartProduct = (props) =>(
  <Card>
    <Card.Header as="h5">{props.name}</Card.Header>
    <Card.Body>
      <img width={'200'} height={200} 
      src="http://shfcs.org/en/wp-content/uploads/2015/11/MedRes_Product-presentation-2.jpg" />
      <Card.Text>
        Price: {`$ ${props.price}`} x {props.count} =  {`$ ${props.price * props.count}`}
      </Card.Text>
      <Button variant="primary" onClick={() => props.removeFromCart(props._id)}>Remove</Button>
    </Card.Body>
  </Card>
)

export default CartProduct