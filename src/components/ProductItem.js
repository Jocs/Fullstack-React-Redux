import React, { Component, PropTypes } from 'react'

class ProductItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			number: this.props.number
		}
	}

	handleOnChange(event) {
		console.log(event.target.value)
		this.setState({number: event.target.value}, () => {
			this.props.handleChange(this.state.number)
		})
		
	}

	componentWillReceiveProps(nextProps) {
    if(nextProps.number !== Number(this.state.number)) {
    	this.setState({number: nextProps.number})
    }
  }
	render() {
		const { id, name, num, money } = this.props
		return(
			<div key={id} className='product-item'>
				<h2>{name}</h2>
				<div>库存：{num}</div>
				<div>价格：{money}</div>
				订单数量：<input type='number' 
					onChange={(event) => this.handleOnChange(event)} 
					value={this.state.number}/>
			</div>
		)
	}
}

export default ProductItem

