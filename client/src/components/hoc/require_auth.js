import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUserProfile} from '../../actions';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        this.context.router.history.push('/signin');
      } else if(!this.props.profile) {
        this.props.getUserProfile()
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({user}) {
    return { authenticated: user.authenticated, profile: user.profile };
  }
  Authentication.contextTypes = {
    router: PropTypes.object
  }

  return connect(mapStateToProps, {getUserProfile})(Authentication);
}