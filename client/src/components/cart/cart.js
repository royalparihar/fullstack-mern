import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartProduct from './CartProduct';
import { removeFromCart } from '../../actions';

class Cart extends Component {
  render() {
    const { cartProducts } = this.props;
    return (
      <div>
      <h1>Cart</h1>
      <div>
        {cartProducts.map(({ product, count }) => <CartProduct
          {...product}
          count={count}
          key={product._id}
          removeFromCart={this.props.removeFromCart} />)}
      </div>
      </div>
    );
  }
}

function mapStateToProps({user}){
  return {
    cartProducts: user.cartProducts
  }
}

export default connect(mapStateToProps, { removeFromCart })(Cart);