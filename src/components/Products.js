import React, { Component, PropTypes } from 'react'
import ProductItem from './ProductItem'
import { addToCart } from '../actions'

class Products extends Component {
	render() {
		const { products, dispatch } = this.props
		const node = products.map(product => {
			return <ProductItem key = {product.id} 
			{...product} 
			handleChange={quantity => dispatch(addToCart(product.id, quantity))}/>
		})
		return(
			<div className='products'>
				<h1>热门订餐</h1>
				{node}
			</div>
		)
	}
}

export default Products