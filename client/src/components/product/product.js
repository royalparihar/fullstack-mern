import React, { useEffect, useState } from 'react';
import {request, addToCart} from '../../actions';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';


const ProductDetail = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  useEffect(() => {
    request.get(`/product/get/${props.match.params.id}`)
    .then((res) => {
      setProduct(res.data.product)
    })
    .catch(e => setError(true));
  },[]);
  const { name, price, description } = product;
  return (
    <div>
      {error ? <div>404</div> :
      <Row>
        <Col sm={6}>
          <img
            width={450}
            height={450}
            src="http://shfcs.org/en/wp-content/uploads/2015/11/MedRes_Product-presentation-2.jpg" />
        </Col>
        <Col sm={6}>
          <h1>{name}</h1>
          <p>
            {description}
          </p>
          <div>
            {`$ ${price}`}
          </div>
          <Button
            onClick={() =>
            props.authenticated ?
            props.addToCart(props._id) :
            props.history.push('/signin')}
          variant="primary">
          Add to cart</Button>
        </Col>
      </Row>
      }
    </div>
  )
}

function mapStateToProps({product, user}){
  return {
    data: product.data,
    authenticated: user.authenticated,
    profile: user.profile
  }
}

export default connect(mapStateToProps, {addToCart})(ProductDetail);
