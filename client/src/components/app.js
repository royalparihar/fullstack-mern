import React, { Component } from 'react';
import Header from './header';
// import { connect } from 'react-redux';
// import {getUserProfile} from '../actions';

export default class App extends Component {
  // componentDidMount() {
  //   if (this.props.authenticated) {
  //     this.props.getUserProfile()
  //   }
  // }
  render() {
    return (
      <div>
        <Header />
        <div style={{marginTop: '30px'}} className='container'>
            {this.props.children}
        </div>
      </div>
    );
  }
}

// function mapStateToProps({user}){
//   return {
//     authenticated: user.authenticated
//   }
// }

// export default connect(mapStateToProps, {getUserProfile})(App);
