import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    GET_USER_PROFILE,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_USER_PROFILE,

} from '../actions/types';

const INITIAL_STATE = {
    updateProfileFailMsg: '',
    profile: null,
    cartProducts: [],
    authenticated: false,
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '',
            authenticated: true,
            profile: action.profile,
            cartProducts: action.profile && action.profile.cart || []
        }
        case UNAUTH_USER:
            return { ...state, authenticated: false }
        case AUTH_ERROR:
            return { ...state, error: action.payload }
        case GET_USER_PROFILE:
            return {...state, profile: action.profile, cartProducts: action.profile && action.profile.cart || []}
        case ADD_TO_CART:
            return {...state, cartProducts: action.product}
        case REMOVE_FROM_CART:
            return {
              ...state, cartProducts: action.product
            }
        case UPDATE_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }
}