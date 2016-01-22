import React, { Component } from 'react'
import Ball from './Ball.js'

class FlyBalls extends Component {
	render() {
		const { balls } = this.props
		const nodes = balls.map(ball => {
			return (
				<Ball key={ball.id} {...ball}/>
			)
		})
		return (
			<div>
				{nodes}
			</div>
		)
	}
}

export default FlyBalls
