import React, { Component } from 'react'

class Ball extends Component {
	render() {
		const { x, y } = this.props
		const style = {
			left: `${x}px`,
			top: `${y}px`
		}
		return (
			<div
				className='fly-ball'
				style={style}
			></div>
		)
	}
}

export default Ball
