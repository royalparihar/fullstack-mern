import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {getProducts, addToCart, getUserProfile} from '../actions';
import ProductCard from './product/productCard';
import { Container, Row, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import Select from 'react-select';


const Home = (props) => {
  useEffect(() => {
    props.getProducts()
    if (props.authenticated && !props.profile) {
      props.getUserProfile()
    }
  }, []);
  const [selectedCategory, setCategory] = useState({});
  const [selectedSubCategory, setSubCategory] = useState({});

  
  const {data,  addToCart, history} = props;
  return (
    <div>
      <Row>
        <Container>
          <Row className='justify-content-between'>
            <Col sm={4} >
              <Select
                onChange={(data) => setCategory({name: data.label, data: data.value})}
                // value={selectedCategory.name}
                options={Object.keys(data).map((key) => ({value: data[key], label: key}))} placeholder="Select Category"
              />
            </Col>
            <Col sm={4}>
              {
                !isEmpty(selectedCategory) &&
                <Select
                  onChange={(data) => setSubCategory({name: data.label, data: data.value})}
                  // value={selectedSubCategory.name}
                  options={Object.keys(selectedCategory.data).map((key) => ({value: selectedCategory.data[key], label: key}))} placeholder="Select Sub Category"
                />
              }
            </Col>
          </Row>
        </Container>
      </Row>
      <Row style={{marginTop: "25px"}}>
        {
          !isEmpty(selectedSubCategory) &&
          selectedSubCategory.data.map((product) =>(
          <Col key={product._id} sm={4}>
            <ProductCard {...product}
              history={history}
              addToCart={addToCart}
              authenticated={props.authenticated}
            />
          </Col>
          ))
        }
      </Row>
    </div>
  );
}

function mapStateToProps({product, user}){
  return {
    data: product.data,
    authenticated: user.authenticated,
    profile: user.profile
  }
}

export default connect(mapStateToProps, {getProducts, addToCart, getUserProfile})(Home);