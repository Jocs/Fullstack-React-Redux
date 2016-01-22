import React, { Component, PropTypes } from 'react'
import { emptyCart, addToCart, checkout } from '../actions'
import CartItem from './CartItem'

class Cart extends Component {
	render() {
		const { cart, dispatch } = this.props
		const nodes = cart.map(c => {
			return (
				<CartItem key={c.id} {...c}
					handleChange={quantity => dispatch(addToCart(c.id, quantity))}
				/>
			)
		})
		const total = cart.reduce((t, c) => t + c.number * c.money, 0)
		return (
			<div className='shop-cart'>
				<h3 id='bottom-cart'>购物车</h3>
				<ul>
					{nodes}
				</ul>
				<h4>总价:{total} 元</h4>
				<button onClick={() => dispatch(emptyCart())}>清空购物车</button>
				<button onClick={() => dispatch(checkout())}>提交订单</button>
			</div>
		)
	}
}

export default Cart
