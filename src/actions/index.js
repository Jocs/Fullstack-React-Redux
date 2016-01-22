import { RECEIVE_PRODUCTS, ADD_FLY_BALL, UPDATE_FLY_BALL, DELETE_FLY_BALL } from '../constants/index'
// depracated fetch and use falcor as the data request library
import falcor from 'falcor'
import FalcorDataSource from 'falcor-http-datasource'

const model = new falcor.Model({ source: new FalcorDataSource('/menu.json') })

export const receiveAllProducts = response => {
	const products = (typeof response === 'object' && response.hasOwnProperty('length')) ? response : response.products
	return {
		type: RECEIVE_PRODUCTS,
		products: products
	}
}

export const getAllProducts = () => {
	return dispatch => {
		getProducts(dispatch)
	}
}

export const addToCart = (id, quantity) => {
	return (dispatch, getState) => {
		const state = Object.assign({}, getState())
		let products = state.products
		products.forEach((product, index) => {
			if (product.id === id && product.number !== quantity) {
				products[index].num += products[index].number - quantity
				products[index].number = Number(quantity)
			}
		})
		sendProducts(dispatch, products)
	}
}

export const emptyCart = () => {
	console.log('d')
	return (dispatch, getState) => {
		const state = Object.assign({}, getState())
		const products = state.products
		products.forEach((product, index) => {
			product.num += product.number
			product.number = 0
		})
		sendProducts(dispatch, products)
	}
}

export const checkout = () => {
	return (dispatch, getState) => {
		const state = Object.assign({}, getState())
		const products = state.products
		products.forEach((product, index) => {
			product.number = 0
		})
		sendProducts(dispatch, products)
	}
}
const getProducts = dispatch => {
	model.get('menu')
		.then(response => {
			const products = JSON.parse(response.json.menu)
			dispatch(receiveAllProducts(products))
		},
			error => console.log(error))
}

const sendProducts = (dispatch, products) => {
	model.setValue(['menu'], { products })
		.then(response => {
			const products = JSON.parse(response).products
			dispatch(receiveAllProducts(products))
		})
}

export const addFlyBall = ({ id, x, y }) => {
	return {
		type: ADD_FLY_BALL,
		id,
		x,
		y
	}
}

export const updateFlyBall = ({ id, x, y }) => {
	return {
		type: UPDATE_FLY_BALL,
		id,
		x,
		y
	}
}

export const deleteFlyBall = (id) => {
	return {
		type: DELETE_FLY_BALL,
		id
	}
}
// const sendProducts = (dispatch, products) => {
// 	const config = {
// 		method: 'post',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			products
// 		})
// 	}
// 	fetch('/products', config)
// 		.then(response => response.json())
// 		.then(response => dispatch(receiveAllProducts(response)))
// }

