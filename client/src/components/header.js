import React, {Component} from 'react';
import { connect } from 'react-redux';
import {searchProduct} from '../actions';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { debounce } from 'lodash';
import Select from 'react-select';

class Header extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            value: props.value
        }
    
        this.changeSearch = debounce(this.props.searchProduct, 250)
      }
    renderSignButton(){
        if (this.props.authenticated){
            return (
                [
                    <Nav.Link key='account'>
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </Nav.Link>,
                    <Nav.Link key='cart'>
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </Nav.Link>,
                    <Nav.Link key='signout'>
                        <Link className="nav-link" to="/signout">Sign out</Link>
                    </Nav.Link>
                ]
            )
        }else{
            return (
                [
                    <Nav.Link key='signin'>
                        <Link to="/signin" className="nav-link">Sign in</Link>
                    </Nav.Link>,
                    <Nav.Link key='signup'>
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                    </Nav.Link>
                ]
            )
        }
    }
    handleChange(e){
        const val = e
    
        this.setState({ value: val }, () => {
          this.changeSearch(val)
        })
    }
    render() {
        return (
            <React.Fragment>
                <Navbar className="justify-content-around"  bg="light" variant="light">
                    <Navbar.Brand>
                        <Link key="Shopping" className="navbar-brand" to="/">Shopping</Link>
                    </Navbar.Brand>
                    <Nav>
                        {this.renderSignButton()}
                    </Nav>
                    <Select
                        className="select-container"
                        onChange={(value) => {
                            window.location.href= `/#/product/${value.value}`
                        }}
                        isSearchable
                        placeholder="Search"
                        onInputChange={(e) => this.handleChange(e)}
                        options={this.props.searchedProduct.map((data) => ({value: data._id, label: data.name}))}
                    />
                </Navbar>
            </React.Fragment>
        )
    }
}

function mapStateToProps({user, product}){
    return {
        authenticated: user.authenticated,
        searchedProduct: product.searchedProduct
    }
}

export default connect(mapStateToProps, {searchProduct})(Header)