import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, CHECK_OUT } from '../constants'
const initialState = {
	products: []
}

function products(state = initialState.products, action) {
	switch (action.type) {
		case RECEIVE_PRODUCTS:
			return action.products
		default:
			return state 
	}
}

const rootReducer = combineReducers({
	products
})

export default rootReducer