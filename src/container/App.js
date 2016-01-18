import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Products from '../components/Products'
import Cart from '../components/Cart'

class App extends Component {
	render() {
		const { products, cart, dispatch } = this.props

		return (
			<div>
				<Products products={products} dispatch={dispatch}/>
				{cart.length > 0? <Cart cart={cart} dispatch={dispatch}/>: null}
			</div>
		)
	}
}

function mapPropsToState(state){
	const cart = state.products.filter(product => product.number > 0)
	console.log(cart)
	return {
		products: state.products,
		cart
	}
}

export default connect(mapPropsToState)(App)