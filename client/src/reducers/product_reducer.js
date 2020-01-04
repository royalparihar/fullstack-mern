import {
  GET_PRODUCT,
  GET_PRODUCT_ERROR,
  SEARCH_PRODUCT,
} from '../actions/types';
import { reduce } from 'lodash'; 

const INITIAL_STATE = {
  error: '',
  data: {},
  searchedProduct: []
}

export default function(state=INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCT:
      const data = reduce(action.products, (acc, item) => {
        const category = item.subCategory.category.name
        const subCategory = item.subCategory.name
        if (!acc[category]) {
            acc[category] = {
                [subCategory]: [item]
            }
        } else if(!acc[category][subCategory]){
            acc[category][subCategory] = [item]
        } else {
            acc[category][subCategory].push(item)
        }
        return acc
      }, {})
      return { ...state, error: '', data }
    case GET_PRODUCT_ERROR:
      return { ...state, error: action.payload }
    case SEARCH_PRODUCT:
      return { ...state, searchedProduct: action.searchedProduct }
    default:
        return state
  }
}