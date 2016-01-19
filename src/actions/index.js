import { ADD_TO_CART, RECEIVE_PRODUCTS, CHECK_OUT } from '../constants/index'
//import falcor from 'falcor'

const model = new falcor.Model({source: new falcor.HttpDataSource('/menu.json') })

export const receiveAllProducts = response => {
	const products = (typeof response === 'object' && response.hasOwnProperty('length'))?
	response : response.products
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
		products.forEach( (product, index) => {
			if(product.id === id && product.number !== quantity) {
				products[index].num +=  products[index].number - quantity
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
		products.forEach( (product, index) => {
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
		products.forEach( (product, index) => {
			product.number = 0
		})
		sendProducts(dispatch, products)
	}
}
const getProducts = dispatch => {
	model.get('menu')
		.then(response => {
			const products = JSON.parse(response.json.menu)
			dispatch(receiveAllProducts(products))}, 
			error => console.log(error))
}

const sendProducts = (dispatch, products) => {
	model.setValue(['menu'], { products })
		.then(response => {
			const products = JSON.parse(response).products
			dispatch(receiveAllProducts(products))
		})
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

