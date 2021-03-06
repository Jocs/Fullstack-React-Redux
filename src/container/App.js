import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Products from '../components/Products'
import Cart from '../components/Cart'
import FlyBalls from '../components/FlyBalls'

class App extends Component {
	render() {
		const { products, flyballs, cart, dispatch } = this.props

		return (
			<div>
				<Products products={products} dispatch={dispatch}/>
				<ReactCSSTransitionGroup transitionName='cart'
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{cart.length > 0 ? <Cart key={1} cart={cart} dispatch={dispatch}/> : null}
				</ReactCSSTransitionGroup>
				<FlyBalls balls={flyballs}/>
			</div>
		)
	}
}

function mapPropsToState(state) {
	const cart = state.products.filter(product => product.number > 0)
	return {
		products: state.products,
		flyballs: state.flyballs,
		cart
	}
}

export default connect(mapPropsToState)(App)
