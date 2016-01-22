import { combineReducers } from 'redux'
import {
	RECEIVE_PRODUCTS,
	ADD_FLY_BALL,
	UPDATE_FLY_BALL,
	DELETE_FLY_BALL
	} from '../constants'

const initialState = {
	products: [],
	flyballs: []
}

function products(state = initialState.products, action) {
	switch (action.type) {
		case RECEIVE_PRODUCTS:
			return action.products
		default:
			return state
	}
}

function flyballs(state = initialState.flyballs, action) {
	switch (action.type) {
		case ADD_FLY_BALL:
			return [...state, {
				id: action.id,
				x: action.x,
				y: action.y
			}]
		case UPDATE_FLY_BALL:
			return state.map(item => {
				if (item.id === action.id) {
					return {
						id: action.id,
						x: action.x,
						y: action.y
					}
				} else {
					return item
				}
			})
		case DELETE_FLY_BALL:
			return [...state].filter(item => item.id !== action.id)
		default:
			return state
	}
}

const rootReducer = combineReducers({
	products,
	flyballs
})

export default rootReducer
