import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home';
import Profile from './components/user/profile';
import Signin from './components/user/signin';
import Signup from './components/user/signup';
import Signout from './components/user/signout';
import Cart from './components/cart/cart';
import Product from './components/product/product';
import RequireAuth from './components/hoc/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

import '../style/style.scss'
// import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('auth_jwt_token');

// if we have a token, consider the user to be signed in
if (token) {
  store.dispatch({type: AUTH_USER})
}
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App hashType="noslash">
        <Switch>
          <Route exact path="/" component= {Home}/>
          <Route path="/profile" component= {RequireAuth(Profile)} />
          <Route path="/cart" component={RequireAuth(Cart)} />
          <Route path="/product/:id" component={Product}/>
          <Route path="/signin" component= {Signin} />
          <Route path="/signup" component= {Signup} />
          <Route path="/signout" component= {RequireAuth(Signout)} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));
