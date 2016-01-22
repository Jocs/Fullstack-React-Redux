import React, { Component } from 'react'
// addFlyBall和undateFlyBall 接受一个对象，deleteFlyBall接受一个id值
import { addFlyBall, updateFlyBall, deleteFlyBall } from '../actions'
import { INIT_Y, FLAMES } from '../constants'

class ProductItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			number: this.props.number
		}
	}

	handleOnChange(event) {
		this.setState({number: event.target.value}, () => {
			this.props.handleChange(this.state.number)
		})
	}

	handleClick(e) {
		this.generateBall(e)
		this.setState({number: Number(this.state.number) + 1},
			() => this.props.handleChange(this.state.number)
		)
	}

	generateBall(e) {
		const { dispatch } = this.props
		const target = e.target
		const start = {
			x: target.offsetLeft,
			y: target.offsetTop
		}
		const cart = document.querySelector('#bottom-cart')
		const cartParent = cart.parentNode
		const end = {
			x: cart.offsetLeft + cartParent.offsetLeft,
			y: cart.offsetTop + cartParent.offsetTop
		}
		const current = {
			id: this.props.id + Math.random().toString(32).substr(2)
		}
		const vy = INIT_Y
		const vx = (end.x - start.x) / FLAMES
		const ay = 2 * (end.y - start.y - FLAMES * vy) / (FLAMES * FLAMES)
		dispatch(addFlyBall({
			id: current.id,
			...start
		}))
		let counter = 0
		const timer = setInterval(() => {
			if (counter <= FLAMES) {
				current.x = start.x + vx * counter
				current.y = start.y + vy * counter + ay * counter * counter / 2
				dispatch(updateFlyBall(current))
				counter++
			} else {
				dispatch(deleteFlyBall(current.id))
				clearInterval(timer)
			}
		}, 20)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.number !== Number(this.state.number)) {
			this.setState({number: nextProps.number})
		}
	}
	render() {
		const { id, name, num, money } = this.props
		return (
			<div key={id} className='product-item'>
				<h2>{name}</h2>
				<div>库存：{num}</div>
				<div>价格：{money}</div>
				订单数量：<input type='number'
					onChange={(event) => this.handleOnChange(event)}
					value={this.state.number}/>
				<button onClick={e => this.handleClick(e)}>+</button>
			</div>
		)
	}
}

export default ProductItem

