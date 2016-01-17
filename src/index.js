import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

class Test extends Component {
	render() {
		return (
			<div> hello ransixi </div>
		)
	}
}

render(
	<Test/>,
	document.querySelector('#root')
)