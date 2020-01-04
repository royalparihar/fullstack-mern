import axios from 'axios';
import { 
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    GET_PRODUCT,
    GET_PRODUCT_ERROR,
    REMOVE_FROM_CART,
    GET_USER_PROFILE,
    UPDATE_USER_PROFILE,
    SEARCH_PRODUCT,
    ADD_TO_CART
} from './types';
const ROOT_URL = process.env.API_URI || 'http://localhost:8000';

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('auth_jwt_token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function signUserIn(data) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signin`, data)
            .then(res => {
                dispatch({type: AUTH_USER, profile: res.data.profile})
                localStorage.setItem('auth_jwt_token', res.data.token);
                window.location = '/';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}

export function signUserUp(userObj) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signup`, userObj)
            .then(res => {
                dispatch({type: AUTH_USER, profile: res.data.profile})
                localStorage.setItem('auth_jwt_token', res.data.token);
                window.location = '/';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Server Error, try later.'})
            });
    }
}

export function signUserOut() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER})
        localStorage.removeItem('auth_jwt_token');
    }
}

export function getProducts() {
    return function (dispatch) {
        axios
            .get(`/product/list`)
            .then(res => {
                dispatch({type: GET_PRODUCT, products: res.data.products})
            })
            .catch(error => {
                console.log(error);
                dispatch({type: GET_PRODUCT_ERROR, payload: 'Server Error, try later.'})
            });
    }
}

export function addToCart(productId) {
    return function (dispatch) {
        axios
        .put(`/user/addCart`, {productId})
        .then(res => {
            dispatch({type: ADD_TO_CART, product: res.data.cart})
        })
        .catch(error => {
            console.log(error);
            dispatch({type: ADD_TO_CART_ERROR, payload: 'Server Error, try later.'})
        });
    }
}

export function removeFromCart(productId) {
    return function (dispatch) {
        axios
            .put(`/user/removeCart`, {productId})
            .then(res => {
                dispatch({type: REMOVE_FROM_CART, product: res.data.cart})
            })
            .catch(error => {
                console.log(error);
                dispatch({type: REMOVE_FROM_CART_ERROR, payload: 'Server Error, try later.'})
        });
    }
}

export function getUserProfile() {
    return function (dispatch) {
        axios
            .get(`/user/profile`)
            .then(res => {
                dispatch({type: GET_USER_PROFILE, profile: res.data})
            })
            .catch(error => {
                console.log(error);
                dispatch({type: GET_USER_PROFILE_ERROR, payload: 'Server Error, try later.'})
            });
    }
}

export function updateProfile(password) {
    return function (dispatch) {
        axios.post(`/user/profile`, password)
        .then(res => {
            dispatch({type: UPDATE_USER_PROFILE, profile: res})
        })
        .catch(error => {
            console.log(error);
            dispatch({type: UPDATE_USER_PROFILE_ERROR, payload: 'Server Error, try later.'})
        });
    }
}

export function searchProduct (searchText) {
    return function (dispatch) {
        axios
        .get(`/product/list?search=${searchText}`)
        .then(res => {
            dispatch({type: SEARCH_PRODUCT, searchedProduct: searchText ? res.data.products : []})
        })
        .catch(error => {
            console.log(error);
            dispatch({type: GET_PRODUCT_ERROR, payload: 'Server Error, try later.'})
        });
    }
}
const request = axios;
export { request };
