import React, { Component, PropTypes } from 'react'

class CartItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			number: this.props.number
		}
	}
	componentWillReceiveProps(nextProps) {
    if(nextProps.number !== Number(this.state.number)) {
    	this.setState({number: nextProps.number})
    }
  }
	handleOnChange(event) {
		event.preventDefault()
		this.setState({
			number: event.target.value
		}, () => this.props.handleChange(this.state.number))
	}
	render() {
		const { name, number, money } = this.props
		return(
			<li>
				<a href='#'>{name} </a>
				<input type='number' 
					onChange={event => this.handleOnChange(event)}
					value={this.state.number}/> 份
				<span> 总价：{number * money} 元</span>
			</li>
		)
	}
}

export default CartItem